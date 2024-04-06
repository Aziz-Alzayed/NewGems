locals {
        resource_group_name    = "new-gems-rg"
        location               = "North Europe"
        static_web_app_name    = "new-gems-static-web"
        app_service_name       = "new-gems-app-service"
        sql_server_name        = "new-gems-sql-server"
        sql_db_name            = "new-gems-sql-db"
        app_environment        = "Production"
        common_tags = {
            Environment          = "Production"
            Project              = "New Gems"
            CostCenter           = "NewGemsProdBudget"
            Owner                = "Aziz Alzayed"
            ManagedBy            = "Terraform"
        }
        
}