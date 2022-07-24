// import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require("dotenv").config();

// app
const app = express();

// mongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('DB Connected!'))
    .catch(err => console.log('DB connection error', err))

// middleware
app.use(morgan("dev"))
app.use(cors({ origin: true, credentials: true }));

// routes

// port
const port = process.env.port || 8080;

// listener
const server = app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);