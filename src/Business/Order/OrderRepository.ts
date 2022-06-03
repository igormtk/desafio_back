import { Order } from "../../Model/Order"

//Interface para passar no construtor das classes e fazer a inversão de dependências para a camada business ficar independente
export interface OrderRepository {
    insertOrder(order: Order):Promise<Order>
    getUserById(id: string):Promise<Order>
    getOrderById(id: string):Promise<Order>
    // getByEmail(email: string):Promise<User>
    // getByTelephone(telephone: string):Promise<User>
    getAllOrders():Promise<Order[]>
    // updateUserByNameTelephone(id:string, name:string, telephone: string, updatedAt: string):Promise<void>
    // deleteById(email: string):Promise<void>
}