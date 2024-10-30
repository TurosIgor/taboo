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
variable "db_image_uri" {
    description = "Database image URI of Taboo game"
    type = string
}
variable "be_image_uri" {
    description = "Backend image URI of Taboo game"
    type = string
}
variable "fe_image_uri" {
    description = "Frontend image URI of Taboo game"
    type = string
}