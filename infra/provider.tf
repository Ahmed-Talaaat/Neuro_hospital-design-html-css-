provider "aws" {
    region = "eu-west-1"
}

terraform {
    backed "s3"{
        bucket = "digilians-tfstate"
        key    = terraform.tfstate"
        region = "eu-west-1"
    }
}