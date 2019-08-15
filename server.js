// require our npm packages 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const nodemailer = require('nodemailer');

// create server and port
const app = express();
const PORT = process.env.PORT || 3000;


// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))

app.listen(PORT, () => {
  console.log("You are listening on port " + "" + PORT)
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname + '/contact.html'));
  console.log(" this is the form that shows")
});

app.post('/contact', (req, res) => {

  "use strict";

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail', // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_EMAIL, // generated ethereal user
        pass: process.env.GMAIL_PASS // generated ethereal password
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: req.body.user_mail, // sender address
      to: 'keyboardluv@gmail.com', // list of receivers
      subject: "Hello ✔", // Subject line
      text: req.body.msg, // plain text body

    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
  res.end("Your message has been sent with success!")

})