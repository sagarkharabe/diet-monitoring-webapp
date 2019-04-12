const mongoose = require('mongoose');
const attributeSchema = new mongoose.Schema({
    userId : String ,
    gender : String,
    age : {
        type : Number,
        require : true
    },
    height : {
        type : Number,
        require : true
    },
   
    weight : {
        type : Number,
        require : true
    },
    bmi : Number,
    calories : Number
})

const attributeModel = mongoose.model('attributes',attributeSchema);
module.exports = attributeModel;