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
    helm = {
      source = "hashicorp/helm"
      version = "2.16.1"
    }
  }
  backend "s3" {
    bucket = "taboo-tf-backend"
    key = "state/terraform.tfstate"
    region = "eu-north-1"
    encrypt = true
    dynamodb_table = "taboo-tf-backend-db"
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
    ebs_csi_role_arn = module.aws.ebs_csi_role_arn
    eks_node_group = module.aws.eks_node_group
    eks_role_policy = module.aws.eks_role_policy
}