import UserBusiness from "../../Business/User/UserBusiness";
import UserData from "../../Data/User/UserData";
import { Response, Request } from "express";
import { CreateUserInputDTO } from "../../Model/User";

//Camada Controller para receber as requisições e devolver as respostas, conversando com a business
export default class UserController {
    private dartCompetitionBusiness: UserBusiness;
    constructor(
    ){
        this.dartCompetitionBusiness = new UserBusiness(new UserData())
    }

    createUser = async (req: Request, res: Response) => {
        const {name, cpf, email, telephone} = req.body

        const input: CreateUserInputDTO = {
            name,
            cpf,
            email,
            telephone
        }
    
        try {
            await this.dartCompetitionBusiness.createUser(input)
            res.send({message: "Usuário Criado com sucesso!"})

        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }
}