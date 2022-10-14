const mongoose = require('mongoose');

const MapboxSnappedGeopointsSchema = new mongoose.Schema({
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

const MapboxSnappedGeopointsModel = mongoose.model("mapbox-snapped-geopoints", MapboxSnappedGeopointsSchema)
module.exports = MapboxSnappedGeopointsModel;