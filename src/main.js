require("dotenv").config()
const { Router } = require("express");
const express = require("express");
const Student = require("./models/mens");
const app = express();                                       //shorten the name of required express
const studentsRouter = require("./routers/routes")
const jwt = require("jsonwebtoken")
require("./db/conn");        
const bcrypt = require("bcryptjs");                                //imported database connection form db/conn.js
const student = require("./models/mens")                 // imported the schema from the students.js
const path = require("path")
const hbs = require("hbs");
const mensModel = require("./models/mens");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;                       // made default value of port
const static_path = path.join(__dirname , "../public")
const template_path = path.join(__dirname, "../templates/views")
const partial_path = path.join(__dirname , "../templates/partials")


app.use(express.json());     
app.use(cookieParser)
app.use(express.urlencoded({extended:false}))                                //used to make a data readable in JSON format
// app.use(studentsRouter);
app.use(express.static(static_path)) 
app.set("view engine" , "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);  



app.get("/" , (req,res) => {
    res.render("index")
})

app.get("/login" , (req , res) => {
    res.render("login")
})

app.get("/register" , (req ,res) => {
    res.send("this is a registration form")
})

//create a new user in our database
app.post("/register" , async (req , res) => {
    try {
        const mensInput = new mensModel({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            password : req.body.pwd
        });
        //create token
        const token = await mensInput.generateToken();
        console.log(token)

        // Add cookie to my website
        res.cookie("jwt" , token , {
            expires: new Data(Date.now() + 3000),
            httpOnly: true
        });
        console.log(cookie);
 
        console.log(mensInput)
        const dataAdded = await mensInput.save();
        res.status(201).send("you are registered");
    } catch(err) {
        res.status(400).send(err)
    }
})

app.post("/login" ,async (req , res) => {
    try {
        const email = req.body.email;
        const password = req.body.pwd;

        const userEmail = await mensModel.findOne({email : email});
        const isMatch = await bcrypt.compare(password , userEmail.password);
        console.log(`login made by ${userEmail}`)

        const token = await userEmail.generateToken();
        // console.log(token)
       
        res.cookie("jwt" , token , {
            expires: new Data(Date.now() + 3000),
            httpOnly: true
        });

        if (isMatch) {
            res.send("You have successfully logged In");
        } else {
            res.send("password invalid");
        } 
    }catch(err) {

    }
})
// calling out the port 
app.listen(port, () => {
    console.log(`connection setup at port ${port}`)
}); //ide plugin search on google x