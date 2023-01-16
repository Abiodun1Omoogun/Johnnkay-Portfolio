// const express = require("express");
// const nodemailer = require("nodemailer");
// const multiparty = require("multiparty");
// require("dotenv").config();

// const app = express();

// const PORT = process.env.PORT || 5000;

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     },
// });

// // verify connection configuration
// transporter.verify(function (error, success) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Server is ready to take our messages");
//     }
// });

// app.post("/send", (req, res) => {
//     let form = new multiparty.Form();
//     let data = {};
//     form.parse(req, function (err, fields) {
//         Object.keys(fields).forEach( function (property) {
//             data[property] = fields[property].toString();
//         });
//         console.log(data);
//         const mail = {
//             sender: `${data.name} <${data.email}>`,
//             to: process.env.EMAIL,
//             subject: "Contact Form",
//             text: `${data.name} <${data.email}> \n${data.message}`
//         };
//         transporter.sendMail(mail, (err, data) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send("Something went wrong.");
//             } else {
//                 res.status(200).send("Email successfully sent to recipient!");
//             }
//         });
//     });
// });

// app.route("/").get((req, res) => {
//     res.sendFile(process.cwd( + "./contactMe.html"));
// });


// // Listening for express server
// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}...`);
// });

const express = require("express");
const nodemailer = require("nodemailer");
const iparty = require("multiparty");
require("dotenv").config();

// create an express app
const app = express();

// configure nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL, // replace with your email address
    pass: process.env.PASS, // replace with your password
  }
});

// verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// create a route to handle form submission
app.post("/send", (req, res) => {
  // create a new multiparty form
  let form = new iparty.Form();
  let data = {};

  // parse the form data
  form.parse(req, (err, fields) => {
    // check if fields is an object
    if (typeof fields === "object") {
      // convert the fields object to a regular object
      Object.keys(fields).forEach((property) => {
        data[property] = fields[property].toString();
      });

      // construct the email
      const mail = {
        sender: `${data.name} <${data.email}>`,
        to: "abiodunebun12@gmail.com", // replace with the recipient's email address
        subject: "Contact Form",
        text: `${data.name} <${data.email}> \n${data.message}`
      };

      // send the email
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          console.log("Email sent sucessfully");
          res.status(200).send("Email successfully sent to recipient!");
        }
      });
    } else {
      // send an error if fields is not an object
      res.status(500).send("Error parsing form data.");
    }
  });
});

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

