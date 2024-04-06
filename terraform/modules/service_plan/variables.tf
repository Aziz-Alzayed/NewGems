variable "name" {
  description = "The name of the service plan"
}

variable "location" {
  description = "The Azure region where the service plan should be created"
}

variable "resource_group_name" {
  description = "The name of the resource group in which to create the service plan"
}

variable "sku_name" {
  description = "Specifies the plan's SKU. For example, B1, B2, B3, F1, D1, P1, P2, P3, etc."
}

variable "os_type" {
  description = "The OS type of the service plan. Possible values are `Windows` or `Linux`."
}

variable "tags" {
  type        = map(string)
  description = "A mapping of tags to assign to the resource"
  default     = {}
}
