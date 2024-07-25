import "express-async-errors";
import db from "../model/index.model";
import { ContactUs, ContactUsInput } from "../model/contactUs.model";
import { Email } from "../utils/email/email";




const createContactUsService = async (
    payload: ContactUsInput
  ): Promise<any> => {    
    const realPayload: ContactUsInput = {
      email: payload.email,
      description: payload.description,
    };
  
    const contactUs = await db.ContactUs.create(realPayload);
  
    // SEND SUCCESS MAIL TO ADMIN
    await new Email("josiahademeso@gmail.com").sendContactUS(contactUs.email,contactUs.description,"New Contact Us Submission");

  
    return "email sent successfully";
  };


const contactUsService = {createContactUsService};

export default contactUsService;
