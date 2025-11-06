"use strict";

const { conusmerToQueue } = require("./src/services/consumerQueue.service");
const queueName = "test-topic";

conusmerToQueue(queueName)
  .then(() => {
    console.log(`Message consumer start ${queueName}`);
  })
  .catch((err) => {
    console.error("Message error: ", err.message);
  });
