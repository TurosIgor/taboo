variable "cluster_endpoint" {
    description = "Endpoint of EKS cluster"
    type = string
}
variable "cluster_certificate_authority" {
    description = "CA for EKS cluster"
    type = string
}
variable "cluster_token" {
    description = "Auth token of EKS cluster"
    type = string
}
variable "db_image_version" {
    description = "Database image version of Taboo game"
    type = string
}
variable "be_image_version" {
    description = "Backend image version of Taboo game"
    type = string
}
variable "fe_image_version" {
    description = "Frontend image version of Taboo game"
    type = string
}
variable "ebs_csi_role_arn" {
  description = "ARN of EBS CSI role to manage Volumes"
  type = string
}
variable "eks_node_group" {
  description = "Name of EKS node group"
  type = string
}
variable "eks_role_policy" {
  description = "ID of EKS cluster role policy"
  type = string
}