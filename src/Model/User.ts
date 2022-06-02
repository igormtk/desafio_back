export class User {
    constructor(
        private id: string,
        private name: string,
        private cpf: string,
        private email: string,
        private telephone: string,
        private created_at: string,
        private updated_at: string,
    ){
        this.id = id,
        this.name = name,
        this.cpf = cpf,
        this.email = email,
        this.telephone = telephone,
        this.created_at = created_at,
        this.updated_at = updated_at
    }
    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getCpf() {
        return this.cpf
    }

    public getEmail() {
        return this.email
    }

    public getTelephone() {
        return this.telephone
    }

    public getCreatedAt() {
        return this.created_at
    }

    public getUpdatedAt() {
        return this.updated_at
    }

    static toUserModel(data:any):User{
        return new User(
            data.id, 
            data.name,
            data.cpf, 
            data.email,
            data.telephone, 
            data.created_at, 
            data.updated_at
        )
    }
}

export type CreateUserInputDTO = {
    name: string, 
    cpf: string,
    email: string, 
    telephone: string
}

export type UpdateUserInputDTO = {
    id: string,
    name: string, 
    email: string, 
    telephone: string
}