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

output "ebs_csi_role_arn" {
  value = aws_iam_role.ebs_csi_driver.arn
}

output "eks_node_group" {
    value = aws_eks_node_group.eks_nodes.node_group_name
}

output "eks_role_policy" {
  value = aws_iam_role_policy_attachment.eks_policy_attachment.id
}