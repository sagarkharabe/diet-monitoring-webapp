var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
require('../models/index');

const Diet = mongoose.model('diets');

//view users complete diet
router.get('/', (req, res) => {

})

//submit die plan
router.post('/', (req, res) => {
    const diet = {
        userId,
        meals,
        calories
    } = req.body;
    res.send('OK Diet submitted')
    const newDiet = new Diet(diet);
    newDiet.save()
        .then(() => {
            console.log('Diet created.')
        })
        .catch((err) => console.log(err))


})

router.delete('/:id', (req, res) => {
    Diet.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            req.flash('success_msg', "Video idea removed");
            res.redirect('/diets/view/submitted')
        })
})
//view all diet plans available 
router.get('/view', (req, res) => {
    Diet.find({})
        .sort({
            date: 'desc'
        })
        .then(diets => {
            res.json(diets)
        })
        .catch(err => {
            console.log(err);
        })
})
//view diets submiited by user
router.get('/view/submitted', (req, res) => {
    var user = req.user
    Diet.find({
            userID: user._id
        })
        .sort({
            date: 'desc'
        })
        .then(diets => {
            res.json(diets)
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;