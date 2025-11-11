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

  // case processing
  consummerToNormal: async () => {
    try {
      const { channel } = await connnectRabbitMQ();
      const notiQueue = "notificationQueueProcess";

      // 1 TTL
      // const timeout = 15000;
      // setTimeout(() => {
      //   channel.consume(notiQueue, (msg) => {
      //     console.log(
      //       "Send notification success process",
      //       msg.content.toString()
      //     );
      //     channel.ack(msg);
      //   });
      // }, timeout);

      // 2.logic

      channel.consume(notiQueue, (msg) => {
        try {
          const numberTest = Math.random();

          if (numberTest < 0.8)
            throw new Error("Send notification message failed!!!");
          console.log(
            "Send notification success process",
            msg.content.toString()
          );
          channel.ack(msg);
        } catch (error) {
          console.error("Send notification error", error);
          channel.ack(msg, false, false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  // case failed
  consummerToFailed: async () => {
    try {
      const { channel } = await connnectRabbitMQ();
      const notificationExchangeDLX = "notificationExDLX";
      const notificationRoutingKeyDLX = "notificationRoutingKeyDLX";
      const notificationQueueHandle = "notificationQueueHotFix";

      await channel.assertExchange(notificationExchangeDLX, "direct", {
        durable: true,
      });

      const queueResult = await channel.assertQueue(notificationQueueHandle, {
        exclusive: false,
      });

      await channel.bindQueue(
        queueResult.queue,
        notificationExchangeDLX,
        notificationRoutingKeyDLX
      );

      await channel.consume(
        queueResult.queue,
        (msg) => {
          console.log(
            "This noti error:, please hot fix::",
            msg.content.toString()
          );
        },
        {
          noAck: true,
        }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = messageService;
