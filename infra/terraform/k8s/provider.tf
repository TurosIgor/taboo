locals {
  kubeconfig = {
    host = var.cluster_endpoint
  }
}

provider "kubernetes" {
    host = var.cluster_endpoint
    token = var.cluster_token
    cluster_ca_certificate = base64decode(var.cluster_certificate_authority)
}

provider "helm" {
  kubernetes {
    host = var.cluster_endpoint
    token = var.cluster_token
    cluster_ca_certificate = base64decode(var.cluster_certificate_authority)
  }
}