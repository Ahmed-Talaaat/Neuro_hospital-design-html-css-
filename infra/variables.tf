variable "environment" {
  type        = string
  description = "The deployment environment from GitHub Actions"
}

variable "vpc_name" {
  type        = string
  description = "The name of the VPC"
}

variable "vpc_cider" {
  type        = string
  description = "The CIDR block for the VPC"
}

variable "subnet_name" {
  type        = string
  description = "The name of the subnet"
}

variable "subnet_cider" {
  type        = string
  description = "The CIDR block for the subnet"
}

variable "cidr_block" {
  type        = string
  default     = "0.0.0.0/0"
  description = "Fallback CIDR block for internet access"
}