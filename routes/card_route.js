const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cardsModel = require('../models/card');

router.get("/allcard", (req,res) => {
    cardsModel.find({}).sort([['Card_Num', 1]]).exec((err,result) => {
        if (err){
            res.send({ err_msg: 'It cannot find any card from database'});
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});


module.exports = router;