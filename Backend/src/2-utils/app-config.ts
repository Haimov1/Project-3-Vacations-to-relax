class AppConfig {

}

// Development Environment:
class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacations";
    public port = 4000;
    public clientUrl = "http://localhost:3000";
}

// Production Environment:
class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
    public mysqlHost = "";
    public mysqlUser = "";
    public mysqlPassword = "";
    public mysqlDatabase = "";
    public port = +process.env.PORT;
}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;