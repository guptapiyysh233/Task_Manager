const mongoose = require('mongoose');

const ListSchema =new mongoose.Schema({
    tittle:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
    
})

const List = mongoose.model('List',ListSchema);
module.exports ={ List}