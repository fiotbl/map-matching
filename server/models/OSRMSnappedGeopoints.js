const mongoose = require('mongoose');

const OSRMSnappedGeopointsSchema = new mongoose.Schema({
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

const OSRMSnappedGeopointsModel = mongoose.model("osrm-snapped-geopoints", OSRMSnappedGeopointsSchema)
module.exports = OSRMSnappedGeopointsModel;