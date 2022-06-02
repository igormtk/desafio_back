import UserBusiness from "../../Business/User/UserBusiness";
import UserData from "../../Data/User/UserData";
import { Response, Request } from "express";
import { CreateUserInputDTO } from "../../Model/User";

//Camada Controller para receber as requisições e devolver as respostas, conversando com a business
export default class UserController {
    private userBusiness: UserBusiness;
    constructor(
    ){
        this.userBusiness = new UserBusiness(new UserData())
    }

    //Recebimento das requisições para a criação de um usuário
    createUser = async (req: Request, res: Response) => {
        //Recebimento das informações
        const {name, cpf, email, telephone} = req.body

        //Transformando em um input e inserindo um type para restringir as infos que o usuário deve inserir
        const input: CreateUserInputDTO = {
            name,
            cpf,
            email,
            telephone
        }
        
        //Em caso de informações corretas:
        try {
            await this.userBusiness.createUser(input)
            res.send({message: "Usuário Criado com sucesso!"})
        
        //Em caso de informações incorretas:
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    getUsers = async (req: Request, res: Response) => {
        const input = req.params.id

        try {
            const user = await this.userBusiness.getUsers(input)
            res.send({user})

        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }
}