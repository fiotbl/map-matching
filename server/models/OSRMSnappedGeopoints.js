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
    versionKey: false
});

const OSRMSnappedGeopointsModel = mongoose.model("osrm-snapped-geopoints", OSRMSnappedGeopointsSchema)
module.exports = OSRMSnappedGeopointsModel;


