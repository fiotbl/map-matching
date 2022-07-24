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
})