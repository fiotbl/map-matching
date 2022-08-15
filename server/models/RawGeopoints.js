const mongoose = require('mongoose');

const RawGeopointSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

const RawGeopointModel = mongoose.model("raw-geopoints", RawGeopointSchema)
module.exports = RawGeopointModel;