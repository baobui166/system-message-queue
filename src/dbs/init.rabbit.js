"use strict";

const amqp = require("amqplib");

const connnectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");

    if (!connection) throw new Error("Connection not established!!!");

    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error("Error connecting", error);
    throw error; // Thêm throw để lỗi được đẩy ra ngoài
  }
};

const connectToRabbitMQForTest = async () => {
  try {
    const { connection, channel } = await connnectRabbitMQ();

    // publish message to queue
    const queue = "test-queue";
    const message = "Hello, shopDev by BaoBui";

    await channel.assertQueue(queue, { durable: true });
    await channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Sent message: ${message}`);

    // close connection
    await connection.close();
  } catch (error) {
    console.error("Error connecting to RabbitMQ", error);
    throw error;
  }
};

const consumerQueue = async (channel, queueName) => {
  try {
    await channel.assertQueue(queueName, { durable: true });
    console.log("Waiting for messages...");

    channel.consume(
      queueName,
      (message) => {
        if (message) {
          console.log(`Received message: ${message.content.toString()}`);
          // 1. find user following Shop
          // 2. Send message to user
          // 3. yes ok => success
          // 4. error, setup DLX
        }
      },
      { noAck: true }
    );
  } catch (error) {
    console.error("Error consuming message from rabbitmq", error);
    throw error;
  }
};

module.exports = {
  connnectRabbitMQ,
  connectToRabbitMQForTest,
  consumerQueue,
};
