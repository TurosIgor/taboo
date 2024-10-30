terraform {
  required_providers {
    kubernetes = {
        source = "hashicorp/kubernetes"
        version = "2.33.0"
    }
    aws = {
      source = "hashicorp/aws"
      version = "5.73.0"
    }
  }
}

module "aws" {
    source = "./aws"
}

module "kubernetes" {
    source = "./k8s"

    cluster_endpoint = module.aws.cluster_endpoint
    cluster_certificate_authority = module.aws.cluster_certificate_authority
    cluster_token = module.aws.cluster_token
    db_image_uri = module.aws.db_image_uri
    be_image_uri = module.aws.be_image_uri
    fe_image_uri = module.aws.fe_image_uri
}