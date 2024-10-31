data "aws_ecr_image" "db_image" {
    repository_name = "taboo/database"
    image_tag = "0.1"
}

data "aws_ecr_image" "be_image" {
    repository_name = "taboo/backend"
    image_tag = "0.1"
}

data "aws_ecr_image" "fe_image" {
    repository_name = "taboo/frontend"
    image_tag = "0.1"
}

data "aws_eks_cluster_auth" "cluster_auth" {
    name = aws_eks_cluster.eks_cluster.name
}

data "aws_iam_policy_document" "eks_assume_role_policy" {
    statement {
      actions = ["sts:AssumeRole"]
      principals {
        type = "Service"
        identifiers = ["eks.amazonaws.com"]
      }
    }
}

data "aws_iam_policy_document" "worker_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}
data "aws_iam_policy_document" "ebs_csi_driver_assume_role" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    resources = ["*"]
  }
}