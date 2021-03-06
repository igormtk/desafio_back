import { CreateUserInputDTO, UpdateUserInputDTO, User } from "../../Model/User";
import { Crypto } from "../../Services/Crypto";
import { IdGenerator } from "../../Services/IdGenerator";
import { UserRepository } from "./UserRepository";

//Camada business para guardar a lógica de programação
export default class UserBusiness {
    private idGenerator: IdGenerator;
    private userData: UserRepository;
    private crypto: Crypto;

    constructor(
        userDataImplementation: UserRepository
    ){  
        this.idGenerator = new IdGenerator
        this.crypto = new Crypto()
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

        if(cpf.length !== 11){
            throw new Error("O cpf não possui o número de dígitos correto!")
        }

        //Criptografando as informações sensíveis
        const cryptedCpf = await this.crypto.crypt(cpf)
        const cryptedEmail = await this.crypto.crypt(email)
        const cryptedTelephone = await this.crypto.crypt(telephone)

        //Consulta das querys para encontrar usuários com os mesmos dados sensiveis(name, cpf, email, telephone)
        const verifyCpf = await this.userData.getByCpf(cryptedCpf)
        const verifyEmail = await this.userData.getByEmail(cryptedEmail)
        const verifyTelephone = await this.userData.getByTelephone(cryptedTelephone)

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
            cryptedCpf,
            cryptedEmail,
            cryptedTelephone,
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
        } 
        
        //Caso um params seja colocado, retornar o usuário em questão
        const result = await this.userData.getById(inputParams)

        if(!result){
            throw new Error("Não existe um usuário com esse id")
        }

        return result
        
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

        //Criptografa telefone após recebimento
        const cryptedTelephone = await this.crypto.crypt(telephone)

        //Nova data de atualização
        const updatedAt = new Date().toString()

        //Atualização do nome, telefone e data de atualização no banco de dados
        await this.userData.updateUserByNameTelephone(id, name, cryptedTelephone, updatedAt)
    }

    //Lógica para a deletar um usuário através de Id
    deleteUser = async(input: string) => {
        //Informações a serem recebidas da camada controller
        const id = input

        //Verifica se foi passado um id
        if(!id){
            throw new Error("Insira um id!")
        }

        //Deleta o usuário no banco de dados
        await this.userData.deleteById(id)
    }

}