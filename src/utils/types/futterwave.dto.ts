import { v4 as uuidv4 } from 'uuid'
export class FlutterwaveDTO {
    card_number!: string;
    cvv!: string;
    expiry_month!: string;
    expiry_year!: string;
    currency?: string = "NGN";
    amount?: string;
    fullname!: string;
    email!: string;
    phone_number!: string;
    tx_ref?: string = uuidv4()
}