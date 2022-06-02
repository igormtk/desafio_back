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

    createUser = async(input: CreateUserInputDTO) => {
        //Informações a serem recebidas da camada controller
        const {name, cpf, email, telephone} = input

        //Verificação das informações recebidas
        if(!name || !cpf || !email || !telephone){
            throw new Error("Um dos campos não foi preenchido!")
        }

        if(typeof name !== "string" || typeof cpf !== "string" || typeof email !== "string" || typeof telephone !== "string"){
            throw new Error("Um dos campos foi preenchido incorretamente!")
        }

        //Criptografia do cpf, email e telefone
        const hashedCpf = await this.hashManager.hash(cpf)
        const hashedEmail = await this.hashManager.hash(email)
        const hashedTelephone = await this.hashManager.hash(telephone)

        //Consulta das querys para encontrar usuários com os dados sensiveis(name, cpf, email, telephone) iguais aos dados recebidos
        const verifyCpf = await this.userData.getByCpf(hashedCpf)
        const verifyEmail = await this.userData.getByEmail(hashedEmail)
        const verifyTelephone = await this.userData.getByTelephone(hashedTelephone)

        //Verificação de cpf, email e telefone para que não haja informações sensiveis duplicadas
        //Primeiro comparando hash, se a comparação for true, existem duplicações
        //Case esteja duplicada, informar qual informação está duplicada
        if(verifyCpf){
            const compareHash = await this.hashManager.compareHash(verifyCpf.getCpf(), hashedCpf)
            
            if(compareHash === true){
                throw new Error("Já existe um usuário com esse Cpf!")
            }
        }

        if(verifyEmail){
            const compareHash = await this.hashManager.compareHash(verifyEmail.getEmail(), hashedEmail)

            if(compareHash === true){
                throw new Error("Já existe um usuário com esse Email!")
            }
        }

        if(verifyTelephone){
            const compareHash = await this.hashManager.compareHash(verifyTelephone.getTelephone(), hashedTelephone)
            
            if(compareHash === true){
                throw new Error("Já existe um usuário com esse telefone!")
            }
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
            hashedCpf,
            hashedEmail,
            hashedTelephone,
            created_at,
            updated_at
        )

        await this.userData.insertUser(newUser)
     
        
    }

}