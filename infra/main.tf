resource "aws_vpc" "main" {
  cidr_block       = var.vpc_cider
  instance_tenancy = "default"

  tags = {
    Name = var.vpc_name
  }
}

# This tells AWS to build a brand new subnet
resource "aws_subnet" "digi" {
  vpc_id            = aws_vpc.main.id 
  cidr_block        = var.subnet_cider 
  availability_zone = "eu-west-1a"    

  tags = {
    Name = var.subnet_name
  }
}
 
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main"
  }
}

resource "aws_route_table" "routetable" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "route table"
  }
}

resource "aws_route_table_association" "routetableas" {
  subnet_id      = aws_subnet.digi.id
  route_table_id = aws_route_table.routetable.id
}

