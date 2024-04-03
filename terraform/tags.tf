locals {
common_tags = {
    Environment = var.app_environment
    Project     = "New Gems"
    CostCenter  = "NewGemsProdBudget"
    Owner   = "Aziz Alzayed"
    ManagedBy = "Terraform"
  }
}