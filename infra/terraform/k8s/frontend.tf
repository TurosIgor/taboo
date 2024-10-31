resource "kubernetes_deployment_v1" "frontend" {
  metadata {
    name = "frontend"
  }

  spec {
    replicas = 3
    selector {
      match_labels = {
        "app" = "frontend"
      }
    }
    template {
      metadata {
        labels = {
          "app" = "frontend"
        }
      }
      spec {
        container {
          name = "frontend"
          image = var.fe_image_uri
          env {
            name = "API_URL"
            value = "/api"
          }
          resources {
            limits = {
              "memory" = "256Mi"
              "cpu" = "500m"
            }
          }
          port {
            container_port = 80
          }
          volume_mount {
            name = "nginx-config"
            mount_path = "/etc/nginx/nginx.conf"
            sub_path = "nginx.conf"
          }
        }
        volume {
          name = "nginx-config"
          config_map {
            name = kubernetes_config_map_v1.nginx_config.metadata[0].name
          }
        }
      }
    }
  }
  depends_on = [ kubernetes_deployment_v1.backend ]
}

resource "kubernetes_config_map_v1" "nginx_config" {
  metadata {
    name = "nginx-config"
  }
  data = {
    "nginx.conf" = <<-EOT
events {}

http {
    include mime.types;
    
    server {
        listen 80;
        server_name localhost;

        location / {
            root   /usr/share/nginx/html;
            index  index.html;
            try_files $uri /index.html;  # For SPA routing
        }

        location /api/ {
            proxy_pass http://backend-svc.default.svc.cluster.local:80;  # Route API requests to the backend
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOT
  }
}

resource "kubernetes_service_v1" "frontend_lb" {
  metadata {
    name = "frontend-lb"
  }

  spec {
    selector = {
      app = "frontend"
    }
    port {
      protocol = "TCP"
      port = 80
      target_port = 80
    }
    type = "LoadBalancer"
  }
  depends_on = [ var.eks_role_policy ]
}