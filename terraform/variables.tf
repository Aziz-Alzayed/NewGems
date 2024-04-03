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

variable "resource_group_name" {
  description =  "Name of the Azure Resource Group"
  type        = string
}

variable "location" {
  description = "Azure region where resources will be created"
  type        = string
  default     = "North Europe"
}

variable "static_web_app_name" {
  description = "Name of the Azure Static Web App"
  type        = string
}

variable "app_service_name" {
  description = "Name of the Azure App Service"
  type        = string
}
variable sql_server_name {
  description =  "Name of the Azure SQL Server"
  type        = string
}

variable "sql_db_name" {
  description =  "Name of the Azure SQL database"
  type        = string
}

variable "app_environment"{
 description =  "Name of the environment"
  type        = string
}

variable "sql_server_credentials" {
  description = "Azure SQL Server credentials"
  type = object({
    login    = string
    password = string
  })
}