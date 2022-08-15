// import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const RawGeopointsModel = require('./models/RawGeopoints')
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
// mongoose.connect("mongodb+srv://fiora1:fiora123@cluster0.lpo8q.mongodb.net/?retryWrites=true&w=majority")

// middleware
app.use(morgan("dev"))
app.use(cors({ origin: true, credentials: true }));

// routes
// const testRoutes = require("./routes/test")
// app.use("/", testRoutes)

app.get("/getRawGeopoint", (req, res) => {
    RawGeopointsModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

// port
const port = process.env.port || 8080;

// listener
const server = app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);