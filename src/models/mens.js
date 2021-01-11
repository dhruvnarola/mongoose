const mongoose = require("mongoose");
const express = require("express");
const validator = require("validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const mensSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        minlength: 3,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid ID")
            }
        }
    },
    phone : {
        type: Number,
        unique: true,
        required: true,
    },
    password: {
        type: String,   
        required: true,
        unique: true
    },
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }]
})
 //generating token
mensSchema.methods.generateToken = async function (next) {
    try {
        console.log(this._id)
        const createToken = jwt.sign({_id: this._id.toString()}, "mynameisdhruvnarolajagdishbhai..");
        this.tokens = this.tokens.concat({token: createToken})
        await this.save();
        console.log(createToken);
        return createToken;
    } catch (err) {
        res.send(`the error part ${err}`);
        console.log(`the error part ${err}`);
    }   
    next()
}

//hash password
mensSchema.pre("save" , async function (next) {
    if (this.isModified("password")) {
    console.log(`current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password , 10);
    console.log(`current password is ${this.password}`);
    }
    next();
})

const mensModel = new mongoose.model("MensData" , mensSchema);
module.exports = mensModel;