import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: 3306,
          multipleStatements: true,
    },
});

let tableName1: string = "Users"

let tableName2: string = "UserOrder"

export const createTables = async (): Promise<boolean> => {
    try {
        await connection
            .raw(`
            CREATE TABLE IF NOT EXISTS ${tableName1} (
                id VARCHAR(255) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                cpf VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                telephone VARCHAR(255) NOT NULL,
                created_at VARCHAR(255) NOT NULL,
                updated_at VARCHAR(255) NOT NULL
            )
        `);

        await connection
        .raw(`
            CREATE TABLE IF NOT EXISTS ${tableName2} (
                id VARCHAR(255) NOT NULL PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                quantity INT NOT NULL,
                price FLOAT NOT NULL,
                value FLOAT NOT NULL,
                created_at VARCHAR(255) NOT NULL,
                updated_at VARCHAR(255) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES Users (id)
            ); 
        `);

        await connection
        .raw(`
        INSERT INTO ${tableName1} (id, name, cpf, email, telephone, created_at, updated_at) 
        VALUES ( "949470bc-d81c-4a5d-849f-5ba83b277b12", "Marcos Paulo", "12341234123", "marcosp@gmail.com", "23234512", 
        "Thu Jun 02 2022 19:33:24 GMT-0300 (Horário Padrão de Brasília)", "Thu Jun 02 2022 19:33:24 GMT-0300 (Horário Padrão de Brasília)"); 
        `);

        await connection
        .raw(`
        INSERT INTO ${tableName2} (id, user_id, description, quantity, price, value, created_at, updated_at) VALUES ( "949470bc-r81c-4a5d-849g-5ba83b277b14", "949470bc-d81c-4a5d-849f-5ba83b277b12", 
        "Pizza de calabresa", 2, 10, 20, "Thu Jun 02 2022 19:33:24 GMT-0300 (Horário Padrão de Brasília)", 
        "Thu Jun 02 2022 19:33:24 GMT-0300 (Horário Padrão de Brasília)");
        `);

        console.log("Tabelas criadas e populadas com sucesso!");
        // closeConnection()
        return true;
    } catch (e) {
        const error = e as Error;
        console.log(error);
        return false;
    }
};

const closeConnection = () => { connection.destroy(); };


createTables()