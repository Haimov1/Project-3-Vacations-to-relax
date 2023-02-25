import mysql from "mysql";
import appConfig from "./app-config";

// Create a pool of connections: 
const connection = mysql.createPool({
    host: appConfig.mysqlHost,
    user: appConfig.mysqlUser,
    password: appConfig.mysqlPassword,
    database: appConfig.mysqlDatabase,
    timezone: "z"
});

// Execute any sql query:
function execute(sql: string, ...values: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        // Send query to database:
        connection.query(sql, values, (err, result) => {

            // If there is an error executing the query: 
            if (err) {
                reject(err);
                return;
            }

            // If all is ok:
            resolve(result);
        });

    });
}

export default {
    execute
};
