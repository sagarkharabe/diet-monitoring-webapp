var mongoose = require('mongoose');
var dietSchema = new mongoose.Schema({
    userId: String,
    meals: [{
        Breakfast: String,
        Lunch: String,
        snacks: String,
        Dinner: String
    }],
    calories: Number
})
// var dietSchema = new mongoose.Schema({
//     userID: {
//         type: String,
//         require: true
//     },
//     name: {
//         type: String,
//         require: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     'Monday': {
//         breakfast: {
//             name: String,
//         },
//         lunch: {
//             name: String,

//         },
//         snacks: {
//             name: String,

//         },
//         dinner: {
//             name: String,

//         },
//         calories: {
//             type: Number,

//         }

//     },
//     'Tuesday': {
//         breakfast: {
//             name: String,

//         },
//         lunch: {
//             name: String,

//         },
//         snacks: {
//             name: String,

//         },
//         dinner: {
//             name: String,

//         },
//         calories: {
//             type: Number,

//         }

//     },
//     'Wednesday': {
//         breakfast: {
//             name: String,

//         },
//         lunch: {
//             name: String,

//         },
//         snacks: {
//             name: String,

//         },
//         dinner: {
//             name: String,

//         },
//         calories: {
//             type: Number,

//         }

//     },
//     'Thrusday': {
//         breakfast: {
//             name: String,

//         },
//         lunch: {
//             name: String,

//         },
//         snacks: {
//             name: String,

//         },
//         dinner: {
//             name: String,

//         },
//         calories: {
//             type: Number,

//         }

//     },
//     'Friday': {
//         breakfast: {
//             name: String,

//         },
//         lunch: {
//             name: String,

//         },
//         snacks: {
//             name: String,

//         },
//         dinner: {
//             name: String,

//         },
//         calories: {
//             type: Number,

//         }

//     },
//     'Saturday': {
//         breakfast: {
//             name: String,

//         },
//         lunch: {
//             name: String,

//         },
//         snacks: {
//             name: String,

//         },
//         dinner: {
//             name: String,

//         },
//         calories: {
//             type: Number,

//         }

//     },
//     'Sunday': {
//         breakfast: {
//             name: String,

//         },
//         lunch: {
//             name: String,

//         },
//         snacks: {
//             name: String,

//         },
//         dinner: {
//             name: String,

//         },
//         calories: {
//             type: Number,

//         }

//     }
// })

const dietModel = mongoose.model('diets', dietSchema);
module.exports = dietModel;