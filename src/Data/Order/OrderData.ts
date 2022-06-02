import { OrderRepository } from "../../Business/Order/OrderRepository"
import { Order } from "../../Model/Order"
import BaseDatabase from "../BaseDatabase"

//Camada Data para fazer conexão com banco de dados e lógica de queries
export default class OrderData extends BaseDatabase implements OrderRepository {
    protected TABLE_NAME = "UserOrder"

    //Query para inserir usuário no banco de dados
    insertOrder = async (order: Order) => {
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .insert(order)
            
            return order
        } catch (error:any) {
            throw new Error("Erro ao criar usuário no banco de dados!")
        }
    }

    // //Query para procurar usuário por "cpf"
    // getByCpf = async (cpf: string) => {
    //     try {
    //         const queryResult = await BaseDatabase
    //         .connection(this.TABLE_NAME)
    //         .select()
    //         .where("cpf", cpf)
            
    //         console.log(queryResult)
    //         return queryResult[0]
    //     } catch (error:any) {
    //         throw new Error("Erro ao buscar cpf no banco de dados!")
    //     }
    // }

    // //Query para procurar usuário por "email"
    // getByEmail = async (email: string) => {
    //     try {
    //         const queryResult = await BaseDatabase
    //         .connection(this.TABLE_NAME)
    //         .select()
    //         .where("email", email)
         
    //         return queryResult[0]
    //     } catch (error:any) {
    //         throw new Error("Erro ao buscar e-mail no banco de dados!")
    //     }
    // }

    // //Query para procurar usuário por "telephone"
    // getByTelephone = async (telephone: string) => {
    //     try {
    //         const queryResult = await BaseDatabase
    //         .connection(this.TABLE_NAME)
    //         .select()
    //         .where("telephone", telephone)
            
    //         return queryResult[0]
    //     } catch (error:any) {
    //         throw new Error("Erro ao buscar telefone no banco de dados!")
    //     }
    // } 

    // //Query para procurar usuário por "telephone"
    // getById = async (id: string) => {
    //     try {
    //         const queryResult = await BaseDatabase
    //         .connection(this.TABLE_NAME)
    //         .select()
    //         .where({id})
            
    //         return queryResult[0]
    //     } catch (error:any) {
    //         throw new Error("Erro ao buscar usuário por ID!")
    //     }
    // } 

    // //Query para retornar todos os usuários
    // getAllUsers = async () => {
    //     try {
    //         const queryResult = await BaseDatabase
    //         .connection(this.TABLE_NAME)
    //         .select()
            
    //         return queryResult
    //     } catch (error:any) {
    //         throw new Error("Erro ao buscar os usuários!")
    //     }
    // }

    // //Query para atualizar nome, email e telefone de usuário
    // updateUserByNameTelephone = async (id:string, name:string, telephone: string, updatedAt: string) => {
    //     try {
    //         const queryResult = await BaseDatabase.connection.raw(`
    //             UPDATE ${this.TABLE_NAME}
    //             SET name = '${name}', telephone = '${telephone}', updated_at = '${updatedAt}'
    //             WHERE id = '${id}'
    //         `)
            
    //         return queryResult[0]
    //     } catch (error:any) {
    //         throw new Error("Erro ao atualizar por nome e sobrenome!")
    //     }
    // }

    // //Query para deletar usuário
    // deleteById = async (id: string ) => {
       
    //     try {
    //         await BaseDatabase
    //         .connection(this.TABLE_NAME)
    //         .delete()
    //         .where({"id": id})
        
    //     } catch (error:any) {
    //         throw new Error("Erro ao deletar usuário no banco de dados!")
    //     }
    // }
}