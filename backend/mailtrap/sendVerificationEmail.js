import { EMAIL_VERIFICATION_TEMPLATE } from "./emailHTMLTemplates.js"
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
    throw new Error("Error sending email", error.message)
  }
}