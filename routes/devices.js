// Imports
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const deviceModel = require("../models/device");

// Definitions
const mongoURI = 'mongodb://127.0.0.1:27017/stock';

// Database connection and model creation
mongoose.set('strictQuery', false); // Allows to create documents with fields not defined in the schema

mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB! :)");
    })
    .catch(err => console.log(err));

// API routes
app.get("/:brand", (req, res) => {
    deviceModel.find({ brand: req.params.brand }, (err, devices) => {
        if (err) return res.status(500).json({ message: err });
        res.status(200).json({
            message: "Ok",
            devices
        });
    });
});

app.post("/", (req, res) => {
    const newDevice = new deviceModel({
        model: req.body.model,
        brand: req.body.brand,
        price: req.body.price
    });
    console.log(newDevice);

    newDevice.save((err, newDevice) => {
        if (err) return res.status(500).json({ message: err });
        res.status(200).json({
            message: "ok",
            newDevice
        });
    });
});

app.put("/:id", (req, res) => {
    deviceModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, updatedDevice) => {
            if (err) return res.status(500).json({ message: err });
            res.status(200).json({
                message: "Ok",
                updatedDevice
            });
        }
    );
});

app.delete("/:id", (req, res) => {
    deviceModel.findByIdAndDelete(req.params.id, (err, deviceDeleted) => {
        if (err) return res.status(500).json({ message: err });
        res.status(200).json({
            message: "Ok",
            deviceDeleted
        });
    });
});

module.exports = app;
