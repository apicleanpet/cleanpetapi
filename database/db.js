import {Sequelize} from 'sequelize';
import { config } from 'dotenv';
config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const db = new Sequelize(dbName, username, password,{
    host: host,
    port: port,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

export default db;