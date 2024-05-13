// Imports
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
    {
        model: String,
        brand: String,
        price: Number
    },
    {
        versionKey: false,
        collection: "device"
    }
);

module.exports = mongoose.model("Device", deviceSchema);