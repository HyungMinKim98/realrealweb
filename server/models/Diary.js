const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = mongoose.Schema({

    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title : {
        type:String,
        maxlength: 50
    },
    description : {
        type:String
    },
    privacy : {
        type:Number
    },
    category : {
        type:String,
    },
    views : {
        type:Number,
        default: 0
    }
}, { timestamps: true })




const Diary = mongoose.model('Diary', diarySchema);

module.exports = { Diary }