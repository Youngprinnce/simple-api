const amqp = require("amqplib/callback_api");
const sendMail = require("../utils/emailService");
const QUEUE = "sendmail"

//Publisher
const publishMessage = (payload) => {
    amqp.connect("amqp://localhost", (connError, connection) => {
        if (connError) {
            throw connError;
        }

        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw connError;
            }

            channel.assertQueue(QUEUE);

            channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(payload)));
            console.log("Message sent")
        })
    })
}

//Consumer
const consumeMessage = () => {
    amqp.connect("amqp://localhost", (connError, connection) => {
        if (connError) {
            throw connError;
        }

        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw connError;
            }

            channel.assertQueue(QUEUE);

            channel.consume(QUEUE, (msg) => {
                if (msg !== null) {
                    const { email, subject, message } = JSON.parse(msg.content.toString())
                    console.log(`Message recieved`);

                    sendMail(email, subject, message, (err, mail) => {
                        if (mail) {
                            channel.ack(msg)
                            console.log("mail sent")
                            logger.info("Mail sent")
                        }
                    });
                }
            })
        })
    })
}

module.exports = {
    publishMessage,
    consumeMessage
}
require("make-runnable")
