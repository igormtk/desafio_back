import { User } from "../../../src/Model/User"

//Criando um mock da interface para implementar a inversão de dependências nos testes
export interface UserRepositoryMock {
    insertUser(user: User):Promise<User>
    getByCpf(cpf: string):Promise<User>
    getByEmail(email: string):Promise<User>
    getByTelephone(telephone: string):Promise<User>
    getById(id: string):Promise<User>
    getAllUsers():Promise<User[]>
    updateUserByNameTelephone(id:string, name:string, telephone: string, updatedAt: string):Promise<void>
    deleteById(id: string):Promise<void>
}