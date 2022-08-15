// import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const RawGeopointsModel = require('./models/RawGeopoints')
require("dotenv").config();

// app
const app = express();
app.use(express.json())

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
// const testRoutes = require("./routes/test")
// app.use("/", testRoutes)

app.get("/getRawGeopoints", (req, res) => {
    RawGeopointsModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/createRawGeopoints", async (req, res) => {
    const geopoint = req.body;
    const newGeopoint = new RawGeopointsModel(geopoint);
    await newGeopoint.save();

    res.json(geopoint)
})

// port
const port = process.env.port || 8080;

// listener
const server = app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);