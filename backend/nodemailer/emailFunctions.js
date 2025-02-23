import {
  EMAIL_VERIFICATION_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from './emailHTMLTemplates.js';
import transporter from './nodemailer.config.js';

export const sendVerificationEmail = async (email, verificationToken, name) => {
  try {
    const emailContent = EMAIL_VERIFICATION_TEMPLATE.replace(
      /{verificationCode}/g,
      verificationToken
    ).replace(/{userName}/g, name);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Emailed sent successfully', info.response);
  } catch (error) {
    console.log('Error sending verification email', error.message);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name, loginURL) => {
  try {
    const emailContent = WELCOME_EMAIL_TEMPLATE
    .replace(/{userName}/g, name)
    .replace(/{loginLink}/g, loginURL)
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Mern Auth App',
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.log('Error sending welcome email', error.message);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

export const sendResetPasswordEmail = async (email, name, resetURL) => {

  try {
    const emailContent = PASSWORD_RESET_TEMPLATE
    .replace(
      /{resetPasswordLink}/g,
      resetURL
    )
    .replace(/{userName}/g, name);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending reset password email', error.message);
    throw new Error(`Error sending reset password email ${error}`);
  }
};

export const passwordResetSuccessEmail = async (email, name, loginURL) => {
  try {
    const emailContent = PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
      /{loginLink}/g,
      loginURL
    ).replace(/{userName}/g, name);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Successfully',
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending password reset success email: ', error.message);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};


