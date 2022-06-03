import UserBusiness from "../src/Business/User/UserBusiness"
import UserDataMock from "./mocks/UserDataMock/UserDataMock"

//Inversão de dependências nos testes
const userBusinessMock = new UserBusiness(
    new UserDataMock()
)

//Por motivos de simplificação, irei fazer apenas dois testes nos usuários para demonstração.
//O correto seria fazer testes para cada situação de erro e situação de acerto
describe('teste ao cadastrar usuário', () => {

    test("erro ao passar algum input vazio", async () => {
        const input = ({
            id: "id",
            name: "NameTest",
            cpf: "",
            email: "emailTest",
            telephone: "telephoneTest",
            created_at: "created_atTest",
            updated_at: "updated_atTest"
        })

        try {
            await userBusinessMock.createUser(input)

        } catch (error: any) {
            console.log(error.message)
            expect(error.message).toEqual("Um dos campos não foi preenchido!")
        }
    })

    test("erro ao passar id inexistente", async () => {
        expect.assertions
        const input = ("id2")

        try {
            await userBusinessMock.getUsers(input)

        } catch (error: any) {
            console.log(error.message)
            expect(error.message).toEqual("Não existe um usuário com esse id")
        }
    })

})