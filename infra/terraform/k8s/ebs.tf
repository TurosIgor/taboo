resource "kubernetes_service_account_v1" "ebs_csi_sa" {
  metadata {
    name = "ebs-csi-controller-sa"
    namespace = "kube-system"
    annotations = {
        "eks.amazonaws.com/role-arn" = var.ebs_csi_role_arn
    }
  }
}

resource "helm_release" "aws_ebs_csi_driver" {
  name = "aws-ebs-csi-driver"
  repository = "https://kubernetes-sigs.github.io/aws-ebs-csi-driver"
  chart      = "aws-ebs-csi-driver"
  namespace  = "kube-system"
  set {
    name  = "controller.serviceAccount.create"
    value = "false"
  }
  set {
    name  = "controller.serviceAccount.name"
    value = kubernetes_service_account_v1.ebs_csi_sa.metadata[0].name
  }
}