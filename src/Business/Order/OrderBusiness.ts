import { CreateOrderInputDTO, Order, UpdateOrderInputDTO } from "../../Model/Order";
import { IdGenerator } from "../../Services/IdGenerator";
import { OrderRepository } from "./OrderRepository";

//Camada business para guardar a lógica de programação
export default class OrderBusiness {
    private idGenerator: IdGenerator;
    private orderData: OrderRepository;

    constructor(
        orderDataImplementation: OrderRepository
    ){  
        this.idGenerator = new IdGenerator
        this.orderData = orderDataImplementation
    }

    //Lógica para a criação de um usuário
    createOrder = async(input: CreateOrderInputDTO) => {
        //Informações a serem recebidas da camada controller
        const {user_id, description, quantity, price} = input
        
        //Verificação das informações recebidas
        //Para simplificar o projeto não formatarei o telefone nem o email, porém existe a necessidade
        if(!user_id || !description || !quantity || !price){
            throw new Error("Um dos campos não foi preenchido!")
        }

        //verificar se existe usuário com o id passado
        const verifyUser = await this.orderData.getUserById(user_id)

        if(verifyUser === undefined){
            throw new Error("Esse usuário não existe!")
        }

        //Criando id com Id Generator
        const id = this.idGenerator.generate()

        //Calculando valor
        const value = quantity * price

        //Pegando data e horário, para simplificar esse processo usarei new Date()
        const created_at = new Date().toString()

        //Pegando horário de atualização do do pedido, também utilizarei o new Date() para simplificar
        const updated_at = new Date().toString()

        //Criando uma nova instância de pedido da classe Order
        const newOrder = new Order(
            id,
            user_id,
            description,
            quantity,
            price,
            value,
            created_at,
            updated_at
        )

        await this.orderData.insertOrder(newOrder)
    }

    //Lógica para a retornar 1 pedido ou todos
    getOrders = async (input: string) => {
        //Informações a serem recebidas da camada controller
        const id = input
        console.log(input)

        //Caso um params seja colocado, retornar o pedido em questão
        if(id) {
            const result = await this.orderData.getOrderById(id)

            if(!result){
                throw new Error("Não existe um usuário com esse id")
            }

            return result 
        }

        //Caso não seja passado um params, retornar todos os pedidos
        const result = await this.orderData.getAllOrders()

        return result
    }

    // //Lógica para a atualização de 1 pedido
    // //Inserindo um type para restringir as infos que o usuário deve inserir
    updateOrder = async(input: UpdateOrderInputDTO) => {
        //Informações a serem recebidas da camada controller
        const {id, user_id, description, quantity, price}  = input

        //ID é obrigatório para encontrar usuário
        if(!id || !user_id || !description || !quantity || !price){
            throw new Error("Você deve informar todas as informações para atualizar um usuário!")
        }
        
        //Verificar se existe um pedido com o id que foi passado
        const verificaOrder = await this.orderData.getOrderById(id)

        if(!verificaOrder){
            throw new Error("Esse pedido não existe!")
        }

        //Nova data de atualização
        const updatedAt = new Date().toString()

        //Atualização do nome, telefone e data de atualização no banco de dados
        await this.orderData.updateOrderByUserIdDescriptionQuantityPrice(id, user_id, description, quantity, price, updatedAt)
    }

    // //Lógica para a deletar um pedido através de Id
    deleteOrder = async(input: string) => {
        //Informações a serem recebidas da camada controller
        const id = input

        //Verifica se foi passado um id
        if(!id){
            throw new Error("Insira um id!")
        }

        //Deleta o usuário no banco de dados
        await this.orderData.deleteById(id)
    }

}