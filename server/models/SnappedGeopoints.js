const mongoose = require('mongoose');

const SnappedGeopointsSchema = new mongoose.Schema({
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

const SnappedGeopointsModel = mongoose.model("snapped-geopoints", SnappedGeopointsSchema)
module.exports = SnappedGeopointsModel;