resource "kubernetes_stateful_set_v1" "mongo" {
  metadata {
    name = "mongo"
  }

  spec {
    selector {
      match_labels = {
        "app" = "mongo"
      }
    }

    service_name = kubernetes_service_v1.mongo_svc.metadata[0].name
    replicas = 3
    template {
      metadata {
        labels = {
          "app" = "mongo"
        }
      }

      spec {
        container {
          name = "mongo"
          image = "905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/database:${var.fe_image_version}"
          port {
            container_port = 27017
          }
          command = [ "sh", "-c", "cp /scripts/* /docker-entrypoint-initdb.d/ && chmod +x /docker-entrypoint-initdb.d/init.sh && ./docker-entrypoint-initdb.d/init.sh" ]
          volume_mount {
            name = "mongo-data"
            mount_path = "/data/db"
          }
          volume_mount {
            name = "mongo-init"
            mount_path = "/scripts"
          }
        }

        volume {
          name = "mongo-init"
          config_map {
            name = kubernetes_config_map_v1.mongo_init_config.metadata[0].name
          }
        }
      }
    }

    volume_claim_template {
      metadata {
        name = "mongo-data"
      }

      spec {
        access_modes = ["ReadWriteOnce"]
        storage_class_name = kubernetes_storage_class_v1.mongo_storage.metadata[0].name
        resources {
          requests = {
            "storage" = "3Gi"
          }
        }
      }
    }
  }
  depends_on = [ var.eks_node_group ]
}

resource "kubernetes_storage_class_v1" "mongo_storage" {
  metadata {
    name = "mongo-storage"
  }

  storage_provisioner = "ebs.csi.aws.com"
  parameters = {
    "type" = "gp2"
    "fsType" = "ext4"
  }
  reclaim_policy = "Retain"
}

resource "kubernetes_service_v1" "mongo_svc" {
  metadata {
    name = "mongo-svc"
  }

  spec {
    selector = {
      "app" = "mongo"
    }

    port {
      port = 27017
      target_port = 27017
    }
  }
}

resource "kubernetes_config_map_v1" "mongo_init_config" {
    metadata {
      name = "mongo-init-config"
    }

    data = {
      "init.sh" = join("\n", [
      "#!/bin/bash -eux",
      "mongod --bind_ip_all --replSet rs0 &",
      "",
      "until mongosh --eval \"print(\\\"MongoDB is up\\\")\" > /dev/null 2>&1; do",
      "  echo \"Waiting for MongoDB to start...\"",
      "  sleep 2",
      "done",
      "",
      "if [ \"$(hostname)\" == \"mongo-0\" ]; then",
      "  echo \"Initializing replica set...\"",
      "  mongosh --eval \"",
      "    rs.initiate({",
      "      _id: 'rs0',",
      "      members: [",
      "        { _id: 0, host: 'mongo-0.mongo-svc.default.svc.cluster.local:27017', priority: 2 },",
      "        { _id: 1, host: 'mongo-1.mongo-svc.default.svc.cluster.local:27017', priority: 1 },",
      "        { _id: 2, host: 'mongo-2.mongo-svc.default.svc.cluster.local:27017', priority: 1 }",
      "      ]",
      "    })",
      "  \"",
      "else",
      "  echo \"Waiting for primary to initialize replica set...\"",
      "  until mongosh --host mongo-0.mongo-svc.default.svc.cluster.local:27017 --eval \"rs.status()\" > /dev/null 2>&1; do",
      "    echo \"Waiting for replica set to be initialized...\"",
      "    sleep 2",
      "  done",
      "fi",
      "",
      "while true; do",
      "  PRIMARY_STATUS=$(mongosh --eval \"rs.status().members.forEach(m => { if (m.self) print(m.stateStr); })\" | grep \"PRIMARY\" || true)",
      "",
      "  if [ \"$PRIMARY_STATUS\" == \"PRIMARY\" ]; then",
      "    echo \"This pod is primary, proceeding with data import...\"",
      "    mongoimport --uri=\"mongodb://localhost:27017/tabooDB\" --collection words --file /docker-entrypoint-initdb.d/taboo.json --jsonArray",
      "    break",
      "  fi",
      "",
      "  echo \"Waiting for this pod to become primary...\"",
      "  sleep 5",
      "done",
      "",
      "rm -f /docker-entrypoint-initdb.d/taboo.json",
      "",
      "wait"
    ])
    }
}