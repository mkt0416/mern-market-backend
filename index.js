
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./src/api/db/connect');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', require('./src/api/routes/item'));
app.use('/', require('./src/api/routes/user'));

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`Listening on localhost ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();



