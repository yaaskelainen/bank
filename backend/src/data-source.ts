import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./entity/Transaction"
import { Account } from "./entity/Account"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "banking",
    synchronize: true,
    logging: true,
    entities: [User, Account, Category],
    migrations: [],
    subscribers: [],
})
