import { OrderRepository } from "../../Business/Order/OrderRepository"
import { Order } from "../../Model/Order"
import BaseDatabase from "../BaseDatabase"

//Camada Data para fazer conexão com banco de dados e lógica de queries
export default class OrderData extends BaseDatabase implements OrderRepository {
    protected TABLE_NAME = "UserOrder"

    //Query para inserir ordem no banco de dados
    insertOrder = async (order: Order) => {
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .insert(order)
            
            return order
        } catch (error:any) {
            throw new Error("Erro ao criar pedido no banco de dados!")
        }
    }

    //Query para procurar usuário por "id", para identificar se o usuário existe
    getUserById = async (id: string) => {
        try {
            const queryResult = await BaseDatabase.connection.raw(`
            SELECT Users.id, Users.name, Users.cpf, Users.email, Users.telephone, Users.created_at, Users.updated_at 
            FROM ${this.TABLE_NAME} 
            RIGHT JOIN Users on ${this.TABLE_NAME}.user_id = Users.id 
            WHERE Users.id = '${id}';
            `)
            return queryResult[0][0]
        } catch (error:any) {
            throw new Error("Erro ao buscar usuário por ID!")
        }
    }

    //Query para procurar pedido por "id"
    getOrderById = async (id: string) => {
        try {
            const queryResult = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where("id", id)
            
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao buscar pedido no banco de dados!")
        }
    }

    // //Query para retornar todos os pedidos
    getAllOrders = async () => {
        try {
            const queryResult = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            
            return queryResult
        } catch (error:any) {
            throw new Error("Erro ao buscar os pedidos!")
        }
    }

    //Query para atualizar user_id, description, quantity, price, updatedAt
    updateOrderByUserIdDescriptionQuantityPrice = async (
        id: string,
        user_id: string, 
        description: string,
        quantity: number, 
        price: number,
        updatedAt: string
    ) => {

        try {
            const queryResult = await BaseDatabase.connection.raw(`
                UPDATE ${this.TABLE_NAME}
                SET user_id = '${user_id}', description = '${description}', quantity = '${quantity}', 
                price = '${price}', updated_at = '${updatedAt}'
                WHERE id = '${id}'
            `)
            
            return queryResult[0]
        } catch (error:any) {
            throw new Error("Erro ao atualizar as informações!")
        }
    }

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