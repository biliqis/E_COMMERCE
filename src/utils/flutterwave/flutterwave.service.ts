const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(
    process.env.FLW_PUBLIC_KEY,
    process.env.FLW_SECRET_KEY
);
import { FlutterwaveDTO } from "../types/futterwave.dto";


export const paymentService = async (paymentDetails: FlutterwaveDTO) => {
    const payload = {
        card_number: paymentDetails.card_number,
        cvv: paymentDetails.cvv,
        expiry_month: paymentDetails.expiry_month,
        expiry_year: paymentDetails.expiry_year,
        currency: paymentDetails.currency,
        amount: paymentDetails.amount,
        fullname: paymentDetails.fullname,
        email: paymentDetails.email,
        phone_number: paymentDetails.phone_number,
        enckey: "FLWSECK_TEST437a39a29cca",
        authorization: {},
        tx_ref: paymentDetails.tx_ref, // This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
    };
    
    try {
        const response = await flw.Charge.card(payload);
        console.log(response);
        if (response.status === 'error') {
            return response;
          }
        if (response.meta.authorization.mode === "pin") {
            let payload2 = payload;
            payload2.authorization = {
                mode: "pin",
                fields: ["pin"],
                pin: 3310,
            };
            const reCallCharge = await flw.Charge.card(payload2);

            if (response.status === 'error') {
                return response;
              }
            const callValidate = await flw.Charge.validate({
                otp: "12345",
                flw_ref: reCallCharge.data.flw_ref,
            });
            console.log(callValidate);
        }
        if (response.meta.authorization.mode === "redirect") {
            var url = response.meta.authorization.redirect;
        }

        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
