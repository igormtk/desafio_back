import { Response, Request } from "express";
import OrderBusiness from "../../Business/Order/OrderBusiness";
import OrderData from "../../Data/Order/OrderData";


//Camada Controller para receber as requisições e devolver as respostas, conversando com a business
export default class OrderController {
    private orderBusiness: OrderBusiness;
    constructor(
    ){
        this.orderBusiness = new OrderBusiness(new OrderData())
    }

    //Recebimento das requisições para a criação de um usuário
    createOrder = async (req: Request, res: Response) => {
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

    // //Recebimento das requisições para a receber 1 ou todos os usuários
    // getUsers = async (req: Request, res: Response) => {
    //     //Recebimento do id para buscar apenas 1 usuário, caso não passe um id, retornará todos
    //     const input = req.params.id

    //     //Em caso de informações corretas:
    //     try {
    //         //Executar a lógica do getUsers na camada Business
    //         const user = await this.userBusiness.getUsers(input)
    //         res.send({user})
        
    //     //Em caso de informações incorretas:
    //     } catch (error:any) {
    //         res.statusCode = 400
    //         let message = error.sqlMessage || error.message
    //         res.send({ message })
    //     }
    // }

    // updateUser = async (req: Request, res: Response) => {
    //     //Recebimento das informações necessárias para atualizar usuário
    //     const input = req.body

    //     //Em caso de informações corretas:
    //     try {
    //         //Executar a lógica do getUsers na camada Business
    //         await this.userBusiness.updateUser(input)
    //         res.send({message: "Usuário atualizado com sucesso!"})
        
    //     //Em caso de informações incorretas:
    //     } catch (error:any) {
    //         res.statusCode = 400
    //         let message = error.sqlMessage || error.message
    //         res.send({ message })
    //     }
    // }

    // deleteUser = async (req: Request, res: Response) => {
    //     //Recebimento do id para deletar apenas 1 usuário
    //     const input = req.body.id

    //     //Em caso de informações corretas:
    //     try {
    //         //Executar a lógica do getUsers na camada Business
    //         await this.userBusiness.deleteUser(input)
    //         res.send({message: "Usuário deletado com sucesso!"})
        
    //     //Em caso de informações incorretas:
    //     } catch (error:any) {
    //         res.statusCode = 400
    //         let message = error.sqlMessage || error.message
    //         res.send({ message })
    //     }
    // }
}