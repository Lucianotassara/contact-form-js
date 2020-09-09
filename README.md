# contact-form-js

This is a very simple API for a contact form. It sends mails using nodemailer and store the messages in a MongoDB database.

## Setup

rename .env.sample to *.env* and modify as needed.

`APP_PORT=3004`

`MONGO_DB_HOST=localhost`

`MONGO_DB_URI=mongodb://localhost/contact-form-js`

## Email configuration

`SENDER_EMAIL_HOST=mail.yourdomain.com`

`SENDER_EMAIL=yourmail@youtdomain.com`

`SENDER_EMAIL_PSSWD=yourPassword`

`RECEIVER_EMAIL=receiverEmail@example.com`


## Run project

`$ npm install`

`$ node -r esm index.js`

## Endpoints

### **GET**: List of messages stored in mongoDB:

**`http://{host}:{port}/consultas`**

### **POST**: Create new message and send mail:

**`http://{host}:{port}/consultas`**

### **GET**: get one message by id:

**`http://{host}:{port}/consultas/{_id}`**


### **DELETE**: Deletes a previously stored message:

**`http://{host}:{port}/consultas`**


You can modify the email messages in this js file: `contact-form-js/utils/mailer.js`



