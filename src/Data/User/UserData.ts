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
            
            return user
        } catch (error:any) {
            throw new Error("Erro ao criar usuário no banco de dados!")
        }
    }

    //Query para procurar usuário por "cpf"
    getByCpf = async (cpf: string) => {
        try {
            const queryResult = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where("cpf", cpf)
            
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao buscar cpf no banco de dados!")
        }
    }

    //Query para procurar usuário por "email"
    getByEmail = async (email: string) => {
        try {
            const queryResult = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where("email", email)
         
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao buscar e-mail no banco de dados!")
        }
    }

    //Query para procurar usuário por "telephone"
    getByTelephone = async (telephone: string) => {
        try {
            const queryResult = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where("telephone", telephone)
            
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao buscar telefone no banco de dados!")
        }
    } 

    //Query para procurar usuário por "id"
    getById = async (id: string) => {
        try {
            const queryResult = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where({id})
            
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao buscar usuário por ID!")
        }
    } 

    //Query para retornar todos os usuários
    getAllUsers = async () => {
        try {
            const queryResult = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            
            return queryResult
        } catch (error:any) {
            throw new Error("Erro ao buscar os usuários!")
        }
    }

    //Query para atualizar nome, email e telefone de usuário
    updateUserByNameTelephone = async (id:string, name:string, telephone: string, updatedAt: string) => {
        try {
            const queryResult = await BaseDatabase.connection.raw(`
                UPDATE ${this.TABLE_NAME}
                SET name = '${name}', telephone = '${telephone}', updated_at = '${updatedAt}'
                WHERE id = '${id}'
            `)
            
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao atualizar por nome e sobrenome!")
        }
    }

    //Query para deletar usuário
    deleteById = async (id: string ) => {
       
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .delete()
            .where({"id": id})
        
        } catch (error:any) {
            throw new Error("Erro ao deletar usuário no banco de dados!")
        }
    }
}