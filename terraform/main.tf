
resource "azurerm_service_plan" "new_gems_app_service_plan" {
  name                = "${var.app_service_name}-plan"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku_name="B1"
  tags = local.common_tags
  os_type ="Linux"
}

# 0 Euro
resource "azurerm_static_web_app" "new-gems-static-web-app" {
  name                = var.static_web_app_name
  resource_group_name = var.resource_group_name
  location            = var.location
  // Define specific properties for the static site, e.g., SKU for cost efficiency
  sku_tier            = "Free"
  tags                = local.common_tags
}

# 12.14 Euro
resource "azurerm_app_service" "new_gems_app_api_service" {
  name                = var.app_service_name
  location            = var.location
  resource_group_name = var.resource_group_name
  app_service_plan_id = azurerm_service_plan.new_gems_app_service_plan.id

  site_config {
     windows_fx_version = "DOTNETCORE|8.0" 
  }

  app_settings = {
    "ASPNETCORE_ENVIRONMENT" = var.app_environment# Add your application-specific settings
  }

  tags = local.common_tags
}

resource "azurerm_mssql_server" "new_gems_sql_server" {
  name                         = var.sql_server_name
  resource_group_name          = var.resource_group_name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = var.sql_server_credentials.login
  administrator_login_password = var.sql_server_credentials.password

  tags = local.common_tags
}

# 13.59 Euro
resource "azurerm_mssql_database" "new_gems_sql_db" {
  name                = "${var.sql_db_name}-dtu"
  server_id           = azurerm_mssql_server.new_gems_sql_server.id
  sku_name            = "S0"
  max_size_gb         = 250
  tags = local.common_tags
}