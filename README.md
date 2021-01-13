## About

SIMPLE API WITH CRUD FUNCTIONALITIES AND EMAIL FEATURES

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What things you need to install the software and how to install them
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [RabbitMQ](https://www.rabbitmq.com)
* [Erlang/otp 23.2](https://www.erlang.org)
* [Mailgun](https://www.mailgun.com) Open an account with mailgun

## Installing

To test on your own computer

- Rename .env.example to .env, insert your mailgun api key and domain name respectively in the .env file

Install all dependencies

- At the root directory. Run **npm install**


## Running the project

Run **npm start** 

Server runs on http://localhost:3000

Run **npm run queue**
This allows the consumeMessage function recieve all queued emails to be sent


## Tests
To run unit test, run the following codes in the root directory

 - `npm run test` 

## License

This project is licensed under the MIT License.