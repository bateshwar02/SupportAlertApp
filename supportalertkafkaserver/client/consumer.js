const {Kafka} = require('kafkajs');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const config = require('../utils/config');
const router = express.Router();
const server = require('http').createServer(app);

const kafka = new Kafka({
  clientId: 'application-alert-app',
  brokers: [config.kafka_host+':'+config.kafka_broker1_port, config.kafka_host+':'+config.kafka_broker2_port,config.kafka_host+':'+config.kafka_broker3_port]
})

const consumer = kafka.consumer({ groupId: 'alert_support_group' });

router.ws('/', async (ws,req) =>{
    ws.on('message', async function(msg) {
      try{
        await consumer.connect();
        await consumer.subscribe({topic: 'alertmessage', fromBeginning: true});
        await consumer.run({
          eachMessage: async ({topic, partition, message}) => {
            ws.send(message.value.toString());
          }
      });
      }catch(e){
        console.error('error======', e);
      }
    })
})

module.exports = router;
