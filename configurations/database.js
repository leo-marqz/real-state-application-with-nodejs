import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: '.env'});

const database = new Sequelize(
    process.env.MYSQL_DB_NAME, 
    process.env.MYSQL_DB_USER, 
    process.env.MYSQL_DB_PASSWORD ?? '', 
    {
        host: process.env.MYSQL_DB_HOST,
        port: process.env.MYSQL_DB_PORT,
        dialect: "mysql",
        define: {
            timestamps: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorsAliases: false,
        logging: false
    }
);


export default database;