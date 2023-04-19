const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
// schema for tasks
const taskSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
      },
    title: String,
    description: String,
    status: {
        type: String,
        require: true,
        enum: ["pending", "in-progress", "completed"],
        default:"pending"
    },
    isDeleted:{type:Boolean, default:false}
  },{timestamps:true});
  

  module.exports=mongoose.model('Task',taskSchema)