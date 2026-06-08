resource "aws_vpc" "main" {
  cidr_block       = var.vpc_cider
  instance_tenancy = "default"

  tags = {
    Name = var.vpc_name
  }
}