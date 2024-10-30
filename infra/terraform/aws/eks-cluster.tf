resource "aws_eks_cluster" "eks_cluster" {
  name = "taboo-eks-cluster"
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = module.vpc.private_subnets
  }

  depends_on = [ aws_iam_role.eks_role ]
}