import { UserRepository } from "../../Business/User/UserRepository"
import { User } from "../../Model/User"
import BaseDatabase from "../BaseDatabase"

//Camada Data para fazer conexão com banco de dados e lógica de queries
export default class UserData extends BaseDatabase implements UserRepository {
    protected TABLE_NAME = "Users"

    //Query para inserir usuário no banco de dados
    insertUser = async (user: User) => {
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .insert(user)
            
            console.log(user)
            return user
        } catch (error:any) {
            throw new Error("Erro ao criar usuário no banco de dados!")
        }
    }

    //Query para procurar usuário por "cpf"
    getByCpf = async (cpf: string) => {
        try {
            const queryResult: User[] = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where({cpf})

            console.log(queryResult)
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao buscar cpf no banco de dados!")
        }
    }

    //Query para procurar usuário por "email"
    getByEmail = async (email: string) => {
        try {
            const queryResult: User[] = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where({email})
            
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao buscar e-mail no banco de dados!")
        }
    }

    //Query para procurar usuário por "telephone"
    getByTelephone = async (telephone: string) => {
        try {
            const queryResult: User[] = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where({telephone})
            
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao buscar telefone no banco de dados!")
        }
    } 
}