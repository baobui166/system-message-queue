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
  }
};

const connectToRabbitMQForTest = async () => {
  try {
    const { connection, channel } = await connnectRabbitMQ();

    // pushlish message to queue
    const queue = "test-queue";
    const message = "Hello, shopDev by BaoBui";
    await channel.assertQueue(queue, message);
    await channel.sendToQueue(queue, Buffer.from(message));

    // close connection
    await connection.close();
  } catch (error) {
    console.error("Error connecting to RabbitMQ", error);
    throw error;
  }
};

module.exports = { connnectRabbitMQ, connectToRabbitMQForTest };
