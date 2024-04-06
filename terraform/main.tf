module "resource_group" {
  source   = "./modules/resource_group"
  name     = local.resource_group_name
  location = local.location
  tags     = local.common_tags
}

module "new_gems_service_plan" {
  source              = "./modules/service_plan"
  name                = "${local.app_service_name}-plan"
  location            = local.location
  resource_group_name = local.resource_group_name
  sku_name            = "B1"
  os_type             = "Linux"
  tags                = local.common_tags
}

module "new_gems_container_registry" {
  source                  = "./modules/container_registry"
  acr_name                = "newgemsacr"
  resource_group_name     = local.resource_group_name
  location                = local.location
  sku                     = "Basic"
  admin_enabled           = true
  tags                    = local.common_tags
}

# 12.14 Euro
module "new_gems_linux_app_service" {
  source                          = "./modules/linux_app_service"
  name                            = local.app_service_name
  resource_group_name             = local.resource_group_name
  location                        = local.location
  service_plan_id                 = module.new_gems_service_plan.service_plan_id
  docker_registry_server_url      = module.new_gems_container_registry.acr_login_server
  docker_registry_server_username = module.new_gems_container_registry.acr_admin_username
  docker_registry_server_password = module.new_gems_container_registry.acr_admin_password
  docker_image                    = "newgemsacr.azurecr.io/myapp:latest" # Adjust based on your naming
  ASPNETCORE_ENVIRONMENT          = local.app_environment
  tags                            = local.common_tags
}
# 0 Euro
module "new_gems_static_web_app" {
  source              = "./modules/static_web_app"
  name                = local.static_web_app_name
  location            = local.location
  resource_group_name = local.resource_group_name
  sku_tier            = "Free"
  tags                = local.common_tags
}


module "new_gems_sql_server" {
  source              = "./modules/sql_server"
  name                = local.sql_server_name
  resource_group_name = local.resource_group_name
  location            = local.location
  admin_login         = var.sql_server_login
  admin_password      = var.sql_server_login_password
  sql_version         = "12.0"
  tags                = local.common_tags
}

# 13.59 Euro
module "new_gems_sql_db" {
  source              = "./modules/sql_db"
  name                = "${local.sql_db_name}-dtu"
  server_id           = module.new_gems_sql_server.sql_server_id
  sku_name            = "S0"
  max_size_gb         = 250
  tags                = local.common_tags
}

