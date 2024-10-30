output "cluster_name" {
    value = aws_eks_cluster.eks_cluster.name
}

output "cluster_token" {
  value = data.aws_eks_cluster_auth.cluster_auth.token
}

output "cluster_endpoint" {
    value = aws_eks_cluster.eks_cluster.endpoint
}

output "cluster_certificate_authority" {
    value = aws_eks_cluster.eks_cluster.certificate_authority[0].data
}

output "db_image_uri" {
    value = data.aws_ecr_image.db_image.image_uri
}

output "be_image_uri" {
    value = data.aws_ecr_image.be_image.image_uri
}

output "fe_image_uri" {
    value = data.aws_ecr_image.fe_image.image_uri
}