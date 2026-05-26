import nodemailer from 'nodemailer';
import { env } from '../config/env';

interface EmailData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export const sendContactEmail = async (data: EmailData): Promise<boolean> => {
  const { name, email, projectType, message } = data;

  // Check if SMTP is configured. If not, log warning and gracefully fallback.
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    console.warn(
      '⚠️ SMTP settings are not fully configured in your .env file. Real email transmission skipped.'
    );
    console.warn('To enable real emails, please set: SMTP_HOST, SMTP_USER, SMTP_PASS.');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT || 587,
      secure: env.SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Project Inquiry</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #FBF9F6;
            margin: 0;
            padding: 0;
            color: #111111;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #FFFFFF;
            border: 1px solid #EAE5DB;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          }
          .header {
            background-color: #111111;
            padding: 40px 30px;
            text-align: center;
            border-bottom: 2px solid #C76B37;
          }
          .header h1 {
            color: #FBF9F6;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            margin: 0;
          }
          .content {
            padding: 40px 35px;
          }
          .intro {
            font-size: 14px;
            line-height: 1.6;
            color: #6D645B;
            margin-bottom: 30px;
            font-weight: 300;
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .data-table td {
            padding: 12px 0;
            border-bottom: 1px solid #F5F1E9;
            vertical-align: top;
          }
          .label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #C76B37;
            width: 130px;
          }
          .value {
            font-size: 14px;
            color: #111111;
            font-weight: 500;
          }
          .message-box {
            background-color: #FBF9F6;
            border: 1px solid #EAE5DB;
            border-radius: 12px;
            padding: 20px;
            font-size: 13px;
            line-height: 1.6;
            color: #111111;
            white-space: pre-wrap;
            font-style: italic;
          }
          .footer {
            background-color: #FBF9F6;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #EAE5DB;
          }
          .footer p {
            margin: 0;
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #6D645B;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Incoming Communications Brief</h1>
          </div>
          <div class="content">
            <div class="intro">
              Sodanapalli Rahul, a secure direct intake module request has been submitted on your portfolio. Here are the engineering specifications:
            </div>
            <table class="data-table">
              <tr>
                <td class="label">01 // Name</td>
                <td class="value">${name}</td>
              </tr>
              <tr>
                <td class="label">02 // Email</td>
                <td class="value"><a href="mailto:${email}" style="color: #C76B37; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td class="label">03 // Focus</td>
                <td class="value" style="text-transform: capitalize;">${projectType}</td>
              </tr>
              <tr>
                <td class="label" style="border: none; padding-bottom: 5px;">04 // Description</td>
                <td style="border: none; padding-bottom: 5px;"></td>
              </tr>
            </table>
            <div class="message-box">${message}</div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Sodanapalli Rahul. Zero layout shift architecture.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"${name}" <${env.SMTP_USER}>`,
      to: env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `💼 New Portfolio Project Brief from ${name}`,
      html: htmlContent,
      text: `Incoming Communications Brief:\n\nName: ${name}\nEmail: ${email}\nFocus: ${projectType}\nDescription:\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Email successfully dispatched to ${env.RECEIVER_EMAIL}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to transmit contact email brief:', error);
    return false;
  }
};
