variable "subscription_id" {
  type        = string
  description = "Azure Subscription ID"
}

variable "client_id" {
  type        = string
  description = "Azure Client ID"
}

variable "client_secret" {
  type        = string
  description = "Azure Client Secret"
}

variable "tenant_id" {
  type        = string
  description = "Azure Tenant ID"
}

variable "sql_server_login" {
  description = "Login for the Azure SQL Server"
  type        = string
}

variable "sql_server_login_password" {
  description = "Password for the Azure SQL Server"
  type        = string
}
