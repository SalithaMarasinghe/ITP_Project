// emailController.js
import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Twilio credentials
const accountSid = 'ACc57924542344e04cfbf328cd20e31f4d';
const authToken = '2b394543d310dd4ee904febac6b85c19';
const client = twilio(accountSid, authToken);


export const sendEmailToSupplier = async (req, res) => {
    try {
        const { recipientEmail, productName } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "itpp8133@gmail.com",
                pass: "itpProject@123",
            },
        });

        const mailOptions = {
            from: "itpp8133@gmail.com",
            to: recipientEmail,
            subject: "Low Stock Alert",
            text: `Dear Supplier,\n\nWe need to replenish stock for the product: ${productName}.\n\nBest Regards,\nYour Company Name`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
};

export const sendNotificationToSupplier = async (req, res) => {
    try {
        const { recipientPhoneNumber, productName } = req.body;

        await client.messages.create({
            body: `Low Stock Alert: We need to replenish stock for the product: ${productName}.`,
            from: '+13024955146',
            to: recipientPhoneNumber,
        });

        res.status(200).json({ success: true, message: "SMS notification sent successfully" });
    } catch (error) {
        console.error("Error sending SMS notification:", error);
        res.status(500).json({ success: false, message: "Failed to send SMS notification" });
    }
};
