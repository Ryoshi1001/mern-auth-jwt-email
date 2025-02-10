import { MailtrapClient } from 'mailtrap'
import dotenv from 'dotenv'

dotenv.config() 

//exported to use in app update name to be descriptive
export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_HOST_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

// exported to use in app 
export const sender = {
  email: "hello@demomailtrap.com",
  name: "MeAuth App Email",
};

// recipients will users signin up into Auth App
// const recipients = [
//   {
//     email: "ryoshi16421@proton.me",
//   }
// ];

//not needed in config file
// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "MeAuth App Email",
//     text: "Text for email",
//     category: "MeAuth Application Test",
//   })
//   .then(console.log, console.error);