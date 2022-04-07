import { CartDTO } from "../Cart/dtos/cart.dto";



export const newCustomFunction = (arr: CartDTO[]):number => {
    let sum = 0;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        sum = sum + element.totalPrice;
    }
    return sum
};


