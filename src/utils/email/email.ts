import * as ejs from "ejs"
import { createTransport } from "nodemailer";
import "dotenv/config";

export class Email  {
    private to :string;
    private from : string;

    public constructor(to: string){
        this.to = to;
        this. from = "Josiah from signs"
    }



    private transport(){
        return createTransport({
            service:"gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
    }

    //SEND ACTUAL MESSAGE
//     private async send (template:string ,subject:string ){
//         //1.RENDER HTML BASED BODY
//         let html;
//         ejs.renderFile(
//           `${__dirname}/emailTemplates/${template}.ejs`,
//           {
//             firstname: this.firstname,
//             link: this.url,
//             subject,
//           },
//           function (err, data) {
//             html = data;
//           }
//         );

//             //2. DEFINE MAIL OPTIONS
//         const mailOptions = {
//         from: this.from,
//         to: this.to,
//         subject,
//         html,

//       };
//       //3. Create a transport and send email
//       await this.transport().sendMail(mailOptions);


//     }

//       //EXTEND THE MAIL FUNCTION TO SEND MAIL FOR WELCOMING NEW USERS.
//   async sendWelcome() {
//     await this.send("welcome", "Welcome to the COG!");
//   }
//   //EXTEND THE MAIL FUNCTION TO SEND MAIL FOR SENDING PASSWORD RESET.
//   async sendPasswordReset() {
//     await this.send(
//       "resetPassword",
//       "Josiah from COG : Your password reset token(valid for only 10 minutes)"
//     );
//   }

  async sendContactUS(email: string , message : string, subject: string ) {
    let html;
    ejs.renderFile(
      `${__dirname}/emailTemplates/contactUs.ejs`,
      {
        email: email,
        message: message,
      },
      function (err, data) {
        html = data;
      }
    );

        //2. DEFINE MAIL OPTIONS
    const mailOptions = {
    from: this.from,
    to: this.to,
    subject,
    html,
};

        //   3. Create a transport and send email
      await this.transport().sendMail(mailOptions);

  }
  // //EXTEND THE MAIL FUNCTION TO SEND MAIL FOR WELCOMING NEW USERS.
  // async sendVerifiedPR() {
  //   await this.send('verifiedPR', 'Your password has successfully changed.')
  // }

  // async otpMail(){
  //   await this.send('otpMail',' "Josiah from property centre : Your OTP(valid for only 10 minutes)' )
  // }

    
}