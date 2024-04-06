variable "name" {
  description = "The name of the app service"
}

variable "location" {
  description = "The Azure region where the app service should be created"
}

variable "resource_group_name" {
  description = "The name of the resource group in which to create the app service"
}

variable "service_plan_id" {
  description = "The ID of the App Service Plan to be used for this app service"
}

variable "site_config" {
  description = "Site configuration for the Linux Web App"
  type = map(any)
  default = {
    application_stack = {
      docker_image     = "node:14-alpine"
      docker_image_tag = "latest"
    }
    // Define other necessary configurations here as needed
  }
}

variable "tags" {
  type        = map(string)
  description = "A mapping of tags to assign to the resource"
  default     = {}
}

variable "docker_registry_server_url" {
  description = "The URL of the Docker registry server. For Azure Container Registry, this is the login server name."
  type        = string
  // No default value is provided for security reasons; should be passed at runtime.
}

variable "docker_registry_server_username" {
  description = "The username for the Docker registry server. For Azure Container Registry, this can be the admin user name."
  type        = string
  // No default value is provided for security reasons; should be passed at runtime.
}

variable "docker_registry_server_password" {
  description = "The password for the Docker registry server. For Azure Container Registry, this can be the admin password."
  type        = string
  sensitive   = true
  // Marked as sensitive to prevent it from being exposed in logs. No default value is provided; should be passed at runtime.
}

variable "docker_image" {
  description = "The name of the Docker image to use, including the tag. For example, 'myregistry.azurecr.io/myapp:latest'."
  type        = string
  // No default value; must be specified according to the actual image you wish to deploy.
}

variable "ASPNETCORE_ENVIRONMENT" {
  description = "Sets the environment for the ASP.NET Core application. Common values are Development, Staging, Production."
  type        = string
  default     = "Production"
  // A default value is provided here; override as necessary.
}