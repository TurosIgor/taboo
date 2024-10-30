resource "kubernetes_deployment" "backend" {
  metadata {
    name = "backend"
  }

  spec {
    replicas = 3
    selector {
      match_labels = {
        "app" = "backend"
      }
    }
    template {
      metadata {
        labels = {
          "app" = "backend"
        }
      }
      spec {
        container {
          name = "backend"
          image = var.be_image_uri
          env {
            name = "MONGO_URI"
            value = "mongodb://mongo-0.mongo-svc.default.svc.cluster.local:27017,mongo-1.mongo-svc.default.svc.cluster.local:27017,mongo-2.mongo-svc.default.svc.cluster.local:27017/tabooDB?replicaSet=rs0"
          }
          env {
            name = "SESSION_SECRET"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.session_secret.metadata[0].name
                key = "SESSION_SECRET"
              }
            }
          }
          resources {
            limits = {
              "memory" = "256Mi"
              "cpu" = "500m"
            }
          }
          port {
            container_port = 3000
          }
        }
      }
    }
  }
  depends_on = [ kubernetes_stateful_set.mongo ]
}

resource "kubernetes_service" "backend_svc" {
  metadata {
    name = "backend-svc"
  }

  spec {
    type = "ClusterIP"
    selector = {
      "app" = "backend"
    }
    port {
      protocol = "TCP"
      port = 80
      target_port = 3000
    }
  }
}

resource "kubernetes_secret" "session_secret" {
  metadata {
    name = "session-secret"
  }

  type = "Opaque"
  data = {
    "SESSION_SECRET" = "<base64 encoded session secret>"
  }
}