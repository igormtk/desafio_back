import { Response, Request } from "express";
import OrderBusiness from "../../Business/Order/OrderBusiness";
import OrderData from "../../Data/Order/OrderData";
import { CreateOrderInputDTO, UpdateOrderInputDTO } from "../../Model/Order";


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
        const {user_id, description, quantity, price} = req.body

        //Transformando em um input e inserindo um type para restringir as infos que o usuário deve inserir
        const input: CreateOrderInputDTO = {
            user_id, 
            description,
            quantity, 
            price 
        }
        
        //Em caso de informações corretas:
        try {
            //Executar a lógica do createUser na camada Business
            await this.orderBusiness.createOrder(input)
            res.send({message: "Pedido criado com sucesso!"})
        
        //Em caso de informações incorretas:
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    //Recebimento das requisições para a receber 1 ou todos os pedidos
    getOrders = async (req: Request, res: Response) => {
        //Recebimento do id para buscar apenas 1 pedido, caso não passe um id, retornará todos
        //Como microsserviço seria interessante fazer um get para pedidos através do id do usuário. Para efeitos de simplificação, não irei fazer 
        const input = req.body.id

        //Em caso de informações corretas:
        try {
            //Executar a lógica do getUsers na camada Business
            const order = await this.orderBusiness.getOrders(input)
            res.send({order})
        
        //Em caso de informações incorretas:
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    //Recebimento das requisições para atualizar um pedido
    updateOrder = async (req: Request, res: Response) => {
        //Recebimento das informações necessárias para atualizar usuário
        const input = req.body

        //Em caso de informações corretas:
        try {
            //Executar a lógica do getUsers na camada Business
            await this.orderBusiness.updateOrder(input)
            res.send({message: "Pedido atualizado com sucesso!"})
        
        //Em caso de informações incorretas:
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    deleteOrder = async (req: Request, res: Response) => {
        //Recebimento do id para deletar apenas 1 usuário
        const input = req.body.id

        //Em caso de informações corretas:
        try {
            //Executar a lógica do getUsers na camada Business
            await this.orderBusiness.deleteOrder(input)
            res.send({message: "Pedido deletado com sucesso!"})
        
        //Em caso de informações incorretas:
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }
}