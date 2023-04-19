const express = require('express')
const router = express.Router()
const { createUser, loginUser } = require("../controller/userController.js")
const { createTask, getTask, updateTask, deleteTask } = require("../controller/taskController.js")
const { Authentication, Authorization } = require("../middleware/auth.js")



//===================== User Registration (Post API) =====================//
router.post("/register", createUser)
//===================== User Login (Post API) =====================//
router.post("/login", loginUser)
//====================Task Registration(post API)================//
router.post("/addTask", Authentication, createTask)
//====================get Task (get task)======================//
router.get("/getTask", Authentication, getTask)
//====================Update the task (put api)==============//
router.put("/tasks/:taskId", Authentication, Authorization, updateTask)
//===================delete the task (delete api)===========//
router.delete("/deleteTask/:taskId", Authentication, Authorization, deleteTask)



router.all('/**', function (req, res) {
    res.status(400).send({ message: "invalid http request" })
})

module.exports = router;
