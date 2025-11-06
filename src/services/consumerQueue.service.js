"use strict";

const { consumerQueue, connnectRabbitMQ } = require("../dbs/init.rabbit");

const messageService = {
  conusmerToQueue: async (queueName) => {
    try {
      const { channel } = await connnectRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error("Error consumerToQueue: ", error);
    }
  },
};

module.exports = messageService;
