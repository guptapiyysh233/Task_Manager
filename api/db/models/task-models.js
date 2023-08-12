const mongoose = require('mongoose');

const TaskSchema =new mongoose.Schema({
    tittle:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listID:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    description:{
        type: String,
        required: true,
        minlength: 1

    },
    dueDate:{
        type: String,
        required: true,
        minlength: 1

    },
    // completed:{
    //     type: Boolean,
    //     default:false
    // }

})

const Task = mongoose.model('Task',TaskSchema);
module.exports ={ Task}