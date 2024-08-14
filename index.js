const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kumaramit28538@gmail.com',
      pass: 'swxb xgzo yuvv vqzb', // This should be stored securely
    }
});

const sendMailAsync = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

app.post("/submit", async (req, res) => {
    const { name, email, mobile } = req.body;

    // Define the subject and text variables
    const subject = 'Form Submission';
    const text = `Thank you for your submission!\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}`;

    const mailOptions = {
      from: 'kumaramit28538@gmail.com',
      to: email,
      subject: subject,
      text: text,
      
  };
  
    try {
      
        // Send email
        const info = await sendMailAsync(mailOptions);
        console.log("Email sent: ", info.response);

        // Send PDF file as a response for download
         
        // const filePath = path.join(__dirname, 'files', 'Fairfox Eon Retail WA.pdf'); // Update with your actual path
        // res.download(filePath,  'Fairfox Eon Retail WA.pdf', (err) => {
        //     if (err) {
        //         console.log("Error sending file:", err);
        //         res.status(500).send("Error sending file");
        //     } else {
        //         console.log("File sent successfully");
        //     }
        // });

    } catch (error) {
        console.log("Error sending email: ", error);
        res.status(500).send("Error sending email");
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server running on port ${port}`);
});
