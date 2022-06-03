import { Order } from "../../Model/Order"

//Interface para passar no construtor das classes e fazer a inversão de dependências para a camada business ficar independente
export interface OrderRepository {
    insertOrder(order: Order):Promise<Order>
    getUserById(id: string):Promise<Order>
    getOrderById(id: string):Promise<Order>
    getAllOrders():Promise<Order[]>
    updateOrderByUserIdDescriptionQuantityPrice(id: string, user_id: string, description: string, quantity: number, price: number, updatedAt: string):Promise<void>
    deleteById(id: string):Promise<void>
}