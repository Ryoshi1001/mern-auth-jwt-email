import { EMAIL_VERIFICATION_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailHTMLTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken, name) => {
  const recipient = [
    {email}
  ]

  try {
    const emailContent = EMAIL_VERIFICATION_TEMPLATE
      .replace(/{verificationCode}/g, verificationToken)
      .replace(/{userName}/g, name)

    const response = await mailtrapClient.send({
      from: sender, 
      to: recipient, 
      subject: "Verify your email", 
      html: emailContent, 
      category: "Email Verification"
    })
    console.log("Emailed sent successfully", response)
  } catch (error) {
    console.log("Error sending verification email", error.message)
    throw new Error(`Error sending welcome email: ${error.message}`)
  }
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [
    {email}
  ]

  try {
    const response = await mailtrapClient.send({
      from: sender, 
      to: recipient, 
      template_uuid: "efb4afc1-9929-4104-92a9-e1f7de077392",
      template_variables: {
        "company_info_name": "MERN Auth App",
        "name": name,
        "company_info_city": "All Cities",
        "company_info_country": "All Countries"
      },
    })
    console.log("Welcome email sent successfully", response)
  } catch (error) {
    console.log("Error sending welcome email", error.message)
    throw new Error(`Error sending welcome email: ${error.message}`)
  }
}