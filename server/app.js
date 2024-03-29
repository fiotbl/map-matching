// import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const RawGeopointsModel = require('./models/RawGeopoints')
const SnappedGeopointsModel = require('./models/SnappedGeopoints')
const OSRMSnappedGeopointsModel = require('./models/OSRMSnappedGeopoints')
const MapboxSnappedGeopointsModel = require('./models/MapboxSnappedGeopoints')

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

app.delete("/deleteSnappedGeopoints", (req, res) => {
    SnappedGeopointsModel.remove({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.delete("/deleteRawGeopoints", (req, res) => {
    RawGeopointsModel.remove({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/createRawGeopoints", async (req, res) => {
    const geopoint = req.body;
    RawGeopointsModel.insertMany(geopoint)
        .then(function (docs) {
            res.json(docs);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
})

app.post("/createSnappedGeopoints", async (req, res) => {
    const snappedGeopoint = req.body;
    console.log("in API", snappedGeopoint)
    SnappedGeopointsModel.insertMany(snappedGeopoint)
        .then(function (docs) {
            res.json(docs);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
})

app.get("/getSnappedGeopoints", (req, res) => {
    SnappedGeopointsModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

// OSRM Routes
app.post("/createOSRMSnappedGeopoints", async (req, res) => {
    const OSRMSnappedGeopoint = req.body;
    console.log("in OSRMSnappedGeopoint API", OSRMSnappedGeopoint)
    OSRMSnappedGeopointsModel.insertMany(OSRMSnappedGeopoint)
        .then(function (docs) {
            res.json(docs);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
})

app.get("/getOSRMSnappedGeopoints", (req, res) => {
    OSRMSnappedGeopointsModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.delete("/deleteOSRMSnappedGeopoints", (req, res) => {
    OSRMSnappedGeopointsModel.remove({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

// Mapbox Routes
app.post("/createMapboxSnappedGeopoints", async (req, res) => {
    const MapboxSnappedGeopoint = req.body;
    MapboxSnappedGeopointsModel.insertMany(MapboxSnappedGeopoint)
        .then(function (docs) {
            res.json(docs);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
})

app.get("/getMapboxSnappedGeopoints", (req, res) => {
    MapboxSnappedGeopointsModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.delete("/deleteMapboxSnappedGeopoints", (req, res) => {
    MapboxSnappedGeopointsModel.remove({}, (err, result) => {
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