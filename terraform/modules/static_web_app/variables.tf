variable "name" {
  description = "The name of the static web app"
}

variable "resource_group_name" {
  description = "The name of the resource group in which to create the static web app"
}

variable "location" {
  description = "The Azure region where the static web app should be created"
}

variable "sku_tier" {
  description = "The pricing tier of the static web app"
  default     = "Free"
}

variable "tags" {
  type        = map(string)
  description = "A mapping of tags to assign to the resource"
  default     = {}
}
