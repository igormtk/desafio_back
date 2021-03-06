//Criação da classe Order
export class Order {
    constructor(
        private id: string,
        private user_id: string,
        private description: string,
        private quantity: number,
        private price: number,
        private value: number,
        private created_at: string,
        private updated_at: string,
    ){
        this.id = id,
        this.user_id = user_id,
        this.description = description,
        this.quantity = quantity,
        this.price = price,
        this.value = value,
        this.created_at = created_at,
        this.updated_at = updated_at
    }
    public getId() {
        return this.id
    }

    public getUserId() {
        return this.user_id
    }

    public getDescription() {
        return this.description
    }

    public getQuantity() {
        return this.quantity
    }

    public getPrice() {
        return this.price
    }

    public getValue() {
        return this.value
    }

    public getCreatedAt() {
        return this.created_at
    }

    public getUpdatedAt() {
        return this.updated_at
    }

    static toUserModel(data:any):Order{
        return new Order(
            data.id, 
            data.user_id,
            data.description, 
            data.quantity,
            data.price,
            data.value, 
            data.created_at, 
            data.updated_at
        )
    }
}

export type CreateOrderInputDTO = {
    user_id: string, 
    description: string,
    quantity: number, 
    price: number
}

export type UpdateOrderInputDTO = {
    id: string
    user_id: string, 
    description: string,
    quantity: number, 
    price: number,
    updated_at: string
}