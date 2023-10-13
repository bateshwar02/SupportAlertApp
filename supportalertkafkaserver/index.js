const express = require('express');
const bodyParser = require('body-parser');

const adminRoute = require('./admin/admin-client');
const producerRoute = require('./client/producer');
const consumerRoute = require('./client/consumer');

const app = express();
const expressWS = require('express-ws')(app);
const cors = require("cors");

//middleware
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use('/admin-client',adminRoute);
app.use('/producer', producerRoute);
app.use('/consumer', consumerRoute);

app.listen(3000, ()=>{
    console.log('app is runing at 3000');
});