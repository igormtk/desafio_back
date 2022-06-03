import { CreateOrderInputDTO, Order } from "../../Model/Order";
import { HashManager } from "../../Services/HashManager";
import { IdGenerator } from "../../Services/IdGenerator";
import { OrderRepository } from "./OrderRepository";

//Camada business para guardar a lógica de programação
export default class OrderBusiness {
    private idGenerator: IdGenerator;
    private orderData: OrderRepository;
    private hashManager: HashManager;

    constructor(
        orderDataImplementation: OrderRepository
    ){  
        this.idGenerator = new IdGenerator
        this.hashManager = new HashManager()
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
        const verifyUser = await this.orderData.getById(user_id)

        if(!verifyUser){
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

    // //Lógica para a retornar 1 ou mais usuários
    // getUsers = async (input: string) => {
    //     //Informações a serem recebidas da camada controller
    //     const inputParams = input

    //     //Caso não seja passado um params, retornar todos os usuários
    //     if(!inputParams){
    //         const result = await this.userData.getAllUsers()
    //         return result
    //     } else {
    //         //Caso um params seja colocado, retornar o usuário em questão
    //         const result = await this.userData.getById(inputParams)

    //         if(!result){
    //             throw new Error("Não existe um usuário com esse id")
    //         }

    //         return result
    //     }
    // }

    // //Lógica para a atualização de 1 usuário
    // //Inserindo um type para restringir as infos que o usuário deve inserir
    // updateUser = async(input: UpdateUserInputDTO) => {
    //     //Informações a serem recebidas da camada controller
    //     //Não coloquei cpf e email porque o cpf não pode ser mudado 
    //     //e dificilmente um usuário pode mudar seu e-mail
    //     const {id, name, telephone}  = input

    //     //ID é obrigatório para encontrar usuário
    //     if(!id || !name || !telephone){
    //         throw new Error("Você deve informar todas as informações para atualizar um usuário!")
    //     }
        
    //     //Verificar se existe um usuário com o id que foi passado
    //     const verificaUser = await this.userData.getById(id)

    //     if(!verificaUser){
    //         throw new Error("Esse usuário não existe!")
    //     }

    //     //Nova data de atualização
    //     const updatedAt = new Date().toString()

    //     //Atualização do nome, telefone e data de atualização no banco de dados
    //     await this.userData.updateUserByNameTelephone(id, name, telephone, updatedAt)
    // }

    // //Lógica para a deletar um usuário através de Id
    // deleteUser = async(input: string) => {
    //     //Informações a serem recebidas da camada controller
    //     const id = input

    //     //Verifica se foi passado um id
    //     if(!id){
    //         throw new Error("Insira um id!")
    //     }

    //     //Deleta o usuário no banco de dados
    //     await this.userData.deleteById(id)
    // }

}