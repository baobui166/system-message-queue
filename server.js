"use strict";

const {
  conusmerToQueue,
  consummerToFailed,
  consummerToNormal,
} = require("./src/services/consumerQueue.service");
const queueName = "test-topic";

// conusmerToQueue(queueName)
//   .then(() => {
//     console.log(`Message consumer start ${queueName}`);
//   })
//   .catch((err) => {
//     console.error("Message error: ", err.message);
//   });

consummerToNormal(queueName)
  .then(() => {
    console.log(`Message consumer normal start `);
  })
  .catch((err) => {
    console.error("Message error: ", err.message);
  });

consummerToFailed(queueName)
  .then(() => {
    console.log(`Message consumer failed start`);
  })
  .catch((err) => {
    console.error("Message error: ", err.message);
  });
