output "linux_app_service_id" {
  value = azurerm_linux_web_app.linux_app_service.id
}

output "linux_app_service_default_hostname" {
  value = azurerm_linux_web_app.linux_app_service.default_hostname
}
