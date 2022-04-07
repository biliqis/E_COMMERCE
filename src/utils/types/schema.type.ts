
export type Cart = {
    productId : string,
    userId:string,
    totalPrice:number
}

export type OrderDto = {
        userId: string,
        products:string[],
        quantity: Number,  
        amount:Number,
        address:string,
        phonenumber: string,
        paymentType: string,
        type: String,
        default: "pending",
        }
    