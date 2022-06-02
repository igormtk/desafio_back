import { CreateUserInputDTO, User } from "../../Model/User";
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

        //Criptografia do cpf, email e telefone
        // const hashedCpf = await this.hashManager.hash(cpf)
        // const hashedEmail = await this.hashManager.hash(email)
        // const hashedTelephone = await this.hashManager.hash(telephone)

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

}