const mongoose = require("mongoose");
const express = require("express");

mongoose.connect("mongodb://localhost:27017/mensdata" , {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection succesfull")
}).catch((err) => {
    console.log(`connection unsucessful ${err}`)
})
