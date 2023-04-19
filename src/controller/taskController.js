//=====================Importing Module and Packages=====================//
const taskModel = require('../models/taskModel.js')
const JWT = require('jsonwebtoken')


////=====================This function is used for Creating an task=====================//
const createTask = async (req, res) => {
    try {

        const data = req.body
        const { title, description, userId } = data

        if (Object.keys(data) == 0) return res.status(400).send({ status: false, message: "No data given for creation" })

        if (!title) return res.status(400).send({ status: false, message: "title  is mandatory" })
        if (!description) return res.status(400).send({ status: false, message: "description is mandatory" })

        const taskCreated = await taskModel.create({title:title, description:description, userId:req.token.payload.userId })
        return res.status(201).send({ status: true, message: "Success", data: taskCreated })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//=========================Get all tasks from the database===========================//
const getTask = async (req, res) => {
    try {
        // console.log('hello');
        const tasks = await taskModel.find({userId: req.token.payload.userId, isDeleted: false });
        return res.status(200).send({ status: true, message: "Success", data: tasks })
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error.message })
    }
}


//========================// TODO: update task status in database===================//
const updateTask = async (req, res) => {

    try {

        // console.log(req.body)
        const { taskId } = req.params;
        const { status } = req.body;

        let updateTask = await taskModel.findOneAndUpdate({ _id: taskId }, { status: status }, { new: true })

        return res.status(200).send({ status: true, message: "Success", data: updateTask })

    } catch (error) {
        return res.status(500).send({ status: 'error', error: error.message })
    }
};



//=====================ToDO : Delete a task api=====================//
const deleteTask = async (req, res) => {
    try {
        let taskId = req.params.taskId;

        let deleteByTaskId = await taskModel.findOneAndUpdate({ _id: taskId, isDeleted: false },
            { isDeleted: true, deletedAt: Date.now() }, { new: true })

        //====================Checking the Book Data is Present(Deleted) or Not======================//
        if (!deleteByTaskId) { return res.status(404).send({ status: false, message: "No task Document Found! task Deletion Unsuccessful" }) }

        res.status(200).send({ status: true, message: "Deleted Successfully" })

    } catch (error) {

        res.status(500).send({ status: 'error', error: error.message })
    }
}



module.exports = { createTask, getTask, updateTask, deleteTask }