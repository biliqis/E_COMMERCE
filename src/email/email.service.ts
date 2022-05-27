import { EmailDto } from "./email.dto";
import mailgun from "mailgun-js";
import { envConfiguration } from "../config/env.configuration";

export class EmailService {
  static emailServiceConfig() {
    const mg = mailgun({
      domain: envConfiguration.MAILGUN_DOMAIN_NAME,
      apiKey: envConfiguration.API_KEY,
    });
    return mg;
  }

  static async sendMail(emailData: EmailDto) {
    try {
    const mail = this.emailServiceConfig();
    const mailStruct = {
      from: envConfiguration.MAILGUN_FROM_EMAIL,
      to: emailData.receiver,
      subject: emailData.subject,
      template: emailData.template,
      "h:X-Mailgun-Variables":  JSON.stringify(emailData.data),
    };

    await mail.messages().send(mailStruct, function (error, body) {
      console.log(body);
    });
    console.log(emailData);

    return {
      statusCode: 200,
      message: "mail sent successfully!",
    };
  } catch(err: any) {
      console.error(err);
      throw new Error("incorrect");
    }
  }
  
}
