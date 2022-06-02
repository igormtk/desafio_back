import { CreateUserInputDTO, UpdateUserInputDTO, User } from "../../Model/User";
import { HashManager } from "../../Services/HashManager";
import { IdGenerator } from "../../Services/IdGenerator";
import { UserRepository } from "./UserRepository";

//Camada business para guardar a lógica de programação
export default class UserBusiness {
    private idGenerator: IdGenerator;
    private userData: UserRepository;
    private hashManager: HashManager;

    constructor(
        userDataImplementation: UserRepository
    ){  
        this.idGenerator = new IdGenerator
        this.hashManager = new HashManager()
        this.userData = userDataImplementation
    }

    //Lógica para a criação de um usuário
    createUser = async(input: CreateUserInputDTO) => {
        //Informações a serem recebidas da camada controller
        const {name, cpf, email, telephone} = input

        //Verificação das informações recebidas
        //Para simplificar o projeto não formatarei o telefone nem o email, porém existe a necessidade
        if(!name || !cpf || !email || !telephone){
            throw new Error("Um dos campos não foi preenchido!")
        }

        if(typeof name !== "string" || typeof cpf !== "string" || typeof email !== "string" || typeof telephone !== "string"){
            throw new Error("Um dos campos foi preenchido incorretamente!")
        }

        if(cpf.length !== 11){
            throw new Error("O cpf não possui o número de dígitos correto!")
        }

        //Consulta das querys para encontrar usuários com os mesmos dados sensiveis(name, cpf, email, telephone)
        const verifyCpf = await this.userData.getByCpf(cpf)
        const verifyEmail = await this.userData.getByEmail(email)
        const verifyTelephone = await this.userData.getByTelephone(telephone)

        if(verifyCpf){
            throw new Error("Já existe um usuário com esse CPF!")
        }

        if(verifyEmail){
            throw new Error("Já existe um usuário com esse e-mail!")
        }

        if(verifyTelephone){
            throw new Error("Já existe um usuário com esse telefone!")
        }


        //Criando id com Id Generator
        const id = this.idGenerator.generate()

        //Pegando data e horário, para simplificar esse processo usarei new Date()
        const created_at = new Date().toString()

        //Pegando horário de atualização do usuário, também utilizarei o new Date() para simplificar
        const updated_at = new Date().toString()

        //Criando uma nova instância de usuário da classe User
        const newUser = new User(
            id,
            name,
            cpf,
            email,
            telephone,
            created_at,
            updated_at
        )

        await this.userData.insertUser(newUser)
    }

    //Lógica para a retornar 1 ou mais usuários
    getUsers = async (input: string) => {
        //Informações a serem recebidas da camada controller
        const inputParams = input

        //Caso não seja passado um params, retornar todos os usuários
        if(!inputParams){
            const result = await this.userData.getAllUsers()
            return result
        } else {
            //Caso um params seja colocado, retornar o usuário em questão
            const result = await this.userData.getById(inputParams)

            if(!result){
                throw new Error("Não existe um usuário com esse id")
            }

            return result
        }
    }

    //Lógica para a atualização de 1 usuário
    //Inserindo um type para restringir as infos que o usuário deve inserir
    updateUser = async(input: UpdateUserInputDTO) => {
        //Informações a serem recebidas da camada controller
        //Não coloquei cpf e email porque o cpf não pode ser mudado 
        //e dificilmente um usuário pode mudar seu e-mail
        const {id, name, telephone}  = input

        //ID é obrigatório para encontrar usuário
        if(!id || !name || !telephone){
            throw new Error("Você deve informar todas as informações para atualizar um usuário!")
        }
        
        //Verificar se existe um usuário com o id que foi passado
        const verificaUser = await this.userData.getById(id)

        if(!verificaUser){
            throw new Error("Esse usuário não existe!")
        }

        //Nova data de atualização
        const updatedAt = new Date().toString()

        //Atualização do nome, telefone e data de atualização
        await this.userData.updateUserByNameTelephone(id, name, telephone, updatedAt)
    }

    //Lógica para a deletar um usuário através de Id
    deleteUser = async(input: string) => {
        //Informações a serem recebidas da camada controller
        const id = input

        if(!id){
            throw new Error("Insira um id!")
        }

        await this.userData.deleteById(id)
    }

}