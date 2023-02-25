class AppConfig {
    // Auth URL:
    public registerUrl = "";
    public loginUrl = "";

    // User URL:
    public vacationsUrl = "";
    public followingVacationsUrl = "";
    public vacationsImageUrl = "";
}

class DevelopmentConfig extends AppConfig {
    // Auth URL:
    public registerUrl = "http://localhost:4000/api/auth/register/";
    public loginUrl = "http://localhost:4000/api/auth/login/";

    // User URL:
    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public followingVacationsUrl = "http://localhost:4000/api/following/";
    public vacationsImageUrl = "http://localhost:4000/api/vacations/images/";
}

class ProductionConfig extends AppConfig {
    // Auth URL:
    public registerUrl = "https://vacations-to-relax.herokuapp.com/api/auth/register/";
    public loginUrl = "https://vacations-to-relax.herokuapp.com/api/auth/login/";

    // User URL:
    public vacationsUrl = "https://vacations-to-relax.herokuapp.com/api/vacations/";
    public followingVacationsUrl = "https://vacations-to-relax.herokuapp.com/api/following/";
    public vacationsImageUrl = "https://vacations-to-relax.herokuapp.com/api/vacations/images/";
}


const appConfig = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default appConfig;

