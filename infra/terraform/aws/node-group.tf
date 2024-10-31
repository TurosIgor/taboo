resource "aws_eks_node_group" "eks_nodes" {
  cluster_name = aws_eks_cluster.eks_cluster.name
  node_group_name = "taboo-node"
  node_role_arn = aws_iam_role.eks_worker_role.arn
  subnet_ids = module.vpc.private_subnets
  scaling_config {
    desired_size = 3
    max_size = 5
    min_size = 3
  }
  depends_on = [ aws_eks_cluster.eks_cluster ]
}