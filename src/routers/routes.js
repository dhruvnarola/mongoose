// const express = require("express");
// const router = new express.Router();
// const Student = require("../models/mens")

// router.post("/students" , async (req , res) => {
//     try {                                                           // try method
//         const user = new Student(req.body);
//         const createUser = await user.save();
//         res.status(201).send(createUser)
//     } catch(err) {                                                  // catch method
//         res.status(400).send(err)
//     }
// })

// //read data of registered students
// router.get("/students/:name" , async (req, res) => {
//     try {
//         const name = req.params;                            //add request for the name id etc....
//         const studentData = await Student.find(name);       // find it through async await function
//         console.log(studentData)

//         if(!studentData) {
//             return res.status(404).send()
//         } else {
//             res.send(studentData)
//         }
//     } catch(err) {
//         res.send(err);
//     }
// })


// // update the students by its id or name 
// router.patch("/students/:name" , async (req ,res) => {
//     try {
//         const name = req.params;                            //add request for the name id etc....
//         const updateStudents = await Student.update(name, req.body);
//         res.send(updateStudents)
//     } catch(err) {
//         res.status(404).send(err)
//     }
// } )

// // delete the data of the students
// router.delete("/students/:name" , async (req , res) => {
//     try {
//         const name = req.params;
//         const deleteStudents = await Student.deleteMany(name)
//         console.log(deleteStudents)
//         res.send(deleteStudents)
//     } catch (err) {
//         res.send(err)
//     }
// })


// module.exports = router;