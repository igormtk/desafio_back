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
            //Executar a lógica do createUser na camada Business
            await this.userBusiness.createUser(input)
            res.send({message: "Usuário criado com sucesso!"})
        
        //Em caso de informações incorretas:
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    //Recebimento das requisições para a receber 1 ou todos os usuários
    getUsers = async (req: Request, res: Response) => {
        //Recebimento do id para buscar apenas 1 usuário, caso não passe um id, retornará todos
        const input = req.params.id

        //Em caso de informações corretas:
        try {
            //Executar a lógica do getUsers na camada Business
            const user = await this.userBusiness.getUsers(input)
            res.send({user})
        
        //Em caso de informações incorretas:
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    updateUser = async (req: Request, res: Response) => {
        //Recebimento do id para buscar apenas 1 usuário, caso não passe um id, retornará todos
        const input = req.body

        //Em caso de informações corretas:
        try {
            //Executar a lógica do getUsers na camada Business
            const user = await this.userBusiness.updateUser(input)
            res.send({message: "Usuário atualizado com sucesso!"})
        
        //Em caso de informações incorretas:
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }
}