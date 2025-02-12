export const EMAIL_VERIFICATION_TEMPLATE = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff; display: flex, justify-content: center; align-items: center;">
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="max-width: 600px; margin: 20px auto !important; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 40px 30px; background: linear-gradient(to right, #3A1C71, #D76D77, #FFAF7B); text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Verify Your Email</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Hello {userName},</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Thank you for signing up! Please verify your email address to complete your registration. Here is your verification token.</p>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; margin-bottom: 30px;">
                    <tr>
                        <td align="center">
                            <p style="display: inline-block; padding: 14px 30px; background: linear-gradient(to right, #4158D0, #C850C0, #FFCC70); color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; text-transform: uppercase; font-size: 16px;">{verificationCode}</p>
                        </td>
                    </tr>
                </table>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">If you didn't create an account, you can safely ignore this email.</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Best regards,<br>Your App Team</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px 30px; background-color: #f8f8f8; text-align: center; color: #888888; font-size: 14px;">
                <p style="margin: 0;">© 2025 MERN Auth App. All rights reserved.</p>
                <p style="margin: 10px 0 0;">
                    <a href="#" style="color: #00CDAC; text-decoration: none;">Terms of Service</a> | 
                    <a href="#" style="color: #FF6B6B; text-decoration: none;">Privacy Policy</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our App</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff; display: flex; justify-content: center; align-items: center;">
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="max-width: 600px; margin: 20px auto !important; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header Section -->
        <tr>
            <td style="padding: 40px 30px; background: linear-gradient(to right, #3A1C71, #D76D77, #FFAF7B); text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Welcome to Our App!</h1>
            </td>
        </tr>
        <!-- Body Section -->
        <tr>
            <td style="padding: 40px 30px;">
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Hello {userName},</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">We’re thrilled to have you on board! Thank you for verifying your email address and joining our community.</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Here are a few things you can do to get started:</p>
                <ul style="color: #333333; font-size: 16px; line-height: 1.5; padding-left: 20px;">
                    <li>Explore our features and tools.</li>
                    <li>Personalize your profile.</li>
                    <li>Connect with others in the community.</li>
                </ul>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; margin-bottom: 30px;">
                    <tr>
                        <td align="center">
                            <a href="{dashboardLink}" style="display: inline-block; padding: 14px 30px; background: linear-gradient(to right, #4158D0, #C850C0, #FFCC70); color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; text-transform: uppercase; font-size: 16px;">Go to Dashboard</a>
                        </td>
                    </tr>
                </table>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">If you have any questions or need assistance, feel free to reach out to our support team at any time.</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Welcome aboard! We’re excited to see what you’ll accomplish.</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Best regards,<br>Your App Team</p>
            </td>
        </tr>
        <!-- Footer Section -->
        <tr>
            <td style="padding: 20px 30px; background-color: #f8f8f8; text-align: center; color: #888888; font-size: 14px;">
                <p style="margin: 0;">© 2025 MERN Auth App. All rights reserved.</p>
                <p style="margin-top: 10px;">
                    <a href="#" style="color:#00CDAC;text-decoration:none;">Terms of Service</a> | 
                    <a href="#" style="color:#FF6B6B;text-decoration:none;">Privacy Policy</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff; display: flex; justify-content: center; align-items: center;">
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="max-width: 600px; margin: 20px auto !important; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 40px 30px; background: linear-gradient(to right, #3A1C71, #D76D77, #FFAF7B); text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Password Reset Successful</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Hello {userName},</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Your password has been successfully reset. You can now log in to your account using your new password.</p>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; margin-bottom: 30px;">
                    <tr>
                        <td align="center">
                            <a href="{loginLink}" style="display: inline-block; padding: 14px 30px; background: linear-gradient(to right, #4158D0, #C850C0, #FFCC70); color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; text-transform: uppercase; font-size: 16px;">Log In</a>
                        </td>
                    </tr>
                </table>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">If you did not request this password reset or believe this email was sent in error, please contact our support team immediately.</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Best regards,<br>Your App Team</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px 30px; background-color: #f8f8f8; text-align: center; color: #888888; font-size: 14px;">
                <p style="margin: 0;">© 2025 MERN Auth App. All rights reserved.</p>
                <p style="margin: 10px 0 0;">
                    <a href="#" style="color: #00CDAC; text-decoration: none;">Terms of Service</a> | 
                    <a href="#" style="color: #FF6B6B; text-decoration: none;">Privacy Policy</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff; display: flex; justify-content: center; align-items: center;">
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="max-width: 600px; margin: 20px auto !important; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 40px 30px; background: linear-gradient(to right, #3A1C71, #D76D77, #FFAF7B); text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Reset Your Password</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Hello</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">We received a request to reset your password. If you didn't make this request, you can ignore this email. Otherwise, please use the button below to reset your password.</p>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; margin-bottom: 30px;">
                    <tr>
                        <td align="center">
                            <a href="{resetPasswordLink}" style="display: inline-block; padding: 14px 30px; background: linear-gradient(to right, #4158D0, #C850C0, #FFCC70); color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; text-transform: uppercase; font-size: 16px;">Reset Password</a>
                        </td>
                    </tr>
                </table>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">This password reset link will expire in 1 hour for security reasons.</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
                <p style="color: #333333; font-size: 14px; line-height: 1.5; word-break: break-all;">{resetPasswordLink}</p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5;">Best regards,<br>Your App Team</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px 30px; background-color: #f8f8f8; text-align: center; color: #888888; font-size: 14px;">
                <p style="margin: 0;">© 2025 MERN Auth App. All rights reserved.</p>
                <p style="margin: 10px 0 0;">
                    <a href="#" style="color: #00CDAC; text-decoration: none;">Terms of Service</a> | 
                    <a href="#" style="color: #FF6B6B; text-decoration: none;">Privacy Policy</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
