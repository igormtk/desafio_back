import { Order } from "../../Model/Order"

//Interface para passar no construtor das classes e fazer a inversão de dependências para a camada business ficar independente
export interface OrderRepository {
    insertOrder(order: Order):Promise<Order>
    getById(id: string):Promise<Order>
    // getByCpf(cpf: string):Promise<User>
    // getByEmail(email: string):Promise<User>
    // getByTelephone(telephone: string):Promise<User>
    // getAllUsers():Promise<User[]>
    // updateUserByNameTelephone(id:string, name:string, telephone: string, updatedAt: string):Promise<void>
    // deleteById(email: string):Promise<void>
}