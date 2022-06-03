import { User } from "../../Model/User"

//Interface para passar no construtor das classes e fazer a inversão de dependências para a camada business ficar independente
export interface UserRepository {
    insertUser(user: User):Promise<User>
    getByCpf(cpf: string):Promise<User>
    getByEmail(email: string):Promise<User>
    getByTelephone(telephone: string):Promise<User>
    getById(id: string):Promise<User>
    getAllUsers():Promise<User[]>
    updateUserByNameTelephone(id:string, name:string, telephone: string, updatedAt: string):Promise<void>
    deleteById(id: string):Promise<void>
}