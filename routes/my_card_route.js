const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const myfavCardModel = require('../models/myfavCard');

router.post('/addfavcard', (req,res) => {
    myfavCardModel.findOne({ userId: req.session.userId, cardId: req.body.cardId }, (err,result) => {
        if (err)
            throw err;
        else{
            var newModel = { userId: req.session.userId, cardId: req.body.cardId };
            var myfavCard = new myfavCardModel(newModel);
            myfavCard.save( err => {
                if (err)
                    throw err;
                else 
                    res.send({ success_msg: 'This card is add into your favourite list'});
            });
        }
    });
});

router.delete("/deletecard", (req,res) =>{
    myfavCardModel.deleteOne({ userId: req.session.userId, cardId: req.body.cardId }, (err,result) => {
        if (err)
            res.send({ err_msg: 'It cannot be delete/It is already deleted'});
        else 
            res.send({ success_msg: 'This card is removed from your favrouite card list'});
    });
});

router.get('/getmyfavcard', (req,res) => {
    myfavCardModel.find({ userId: req.session.userId }).populate('cardId').exec((err,result) => {
        if (err)
            res.send({ err_msg: 'You still not add any cards into your favourite '});
        else
            res.send(result);
    });
});

module.exports = router;