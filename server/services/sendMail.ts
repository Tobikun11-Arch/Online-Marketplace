const nodemailer = require('nodemailer');

const password = process.env.NEXT_PUBLIC_PASSWORD
const userEmail = process.env.NEXT_PUBLIC_EMAIL

const sendMail = async (lowerCaseEmail: string, emailToken: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userEmail,
      pass: password
    }
  });

  const mailOptions = {
    from: 'BazaarBuddy',
    to: lowerCaseEmail,
    subject: '[Bazaar Buddy] Action required: Verify your identity',
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 5px; max-width: 600px; margin: auto;">
            <h2 style="color: #333; font-size: 24px;">Email Verification</h2>
            <p style="font-size: 16px; color: #555;">
                Thank you for registering! Please verify your email address by clicking the link below:
            </p>
            <p>
                <a href="https://online-marketplace-backend-six.vercel.app/verify/${emailToken}" 
                   style="background-color: #28a745; color: white; paddin g: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">
                   Verify Email
                </a>
            </p>
            <p style="font-size: 14px; color: #777;">
                If you did not create an account, please ignore this email.
            </p>
        </div>
    `
};

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;