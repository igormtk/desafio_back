import BaseDatabase from "../../../src/Data/BaseDatabase";
import { User } from "../../../src/Model/User";
import { userMock, userMock2 } from "./UserMock";
import { UserRepositoryMock } from "./UserRepositoryMock";

//Criando um mock do UserData para implementar a inversão de dependências nos testes
export default class UserDataMock extends BaseDatabase implements UserRepositoryMock {
    //Mocks criados, querys modificadas de acordo com os testes que vou realizar
    insertUser = async (user: User) => {
        return user
    }

   
    getByCpf = async () => {
        return userMock
    }

    
    getByEmail = async () => {
        return userMock
    }

    
    getByTelephone = async () => {
        return userMock
    } 

    
    getById = async () => {
        return userMock
    } 

    
    getAllUsers = async () => {
        return [userMock, userMock2]
    }

    
    updateUserByNameTelephone = async () => {
    }

    
    deleteById = async () => {
    }
}