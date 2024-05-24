import 'dotenv/config'
import otpGenerator from 'otp-generator'
import nodemailer from 'nodemailer';

function sendMailToVerify(receiversEmail) {
    //generate otp
    const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false });

    // let receivers = "sawankushwah36625@gmail.com"
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.PASS_KEY
        },
    });

    async function main() {
        // send mail with defined transport object
        await transporter.sendMail({
            from: {
                name: "AuthPortal",
                address: process.env.EMAIL_ID
            }, // sender address
            to: receiversEmail,
            subject: `${otp} is your AuthPortal verification code ✔ `,
            html: `<p><span style="color: #0ab1cd; text-decoration: underline; cursor: pointer;">${otp}</span> is your Authportal verification code</p>`, // html body
        });

        console.log(`Email has been sent to ${receiversEmail}`);

    }

    main().catch(console.error);

}
// sendMailToVerify("sawankushwah36625@gmail.com");
export default sendMailToVerify