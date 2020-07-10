const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const commentModel = require('../models/comment');
const userModel = require('../models/users');

router.get('/mycomments', (req,res) => {
    commentModel.find({ userId: req.session.userId }).populate('userId').populate('cardId').exec((err,result) => {
        if (err) 
            res.send({ err_msg: 'You do not have any comment' });
        else 
            res.send(result);
    });
});

router.post('/postcomment', (req,res) => {
    
    var model = {
        _id: new mongoose.Types.ObjectId,
        userId: req.session.userId,
        cardId: req.body.cardId,
        comment: req.body.comment
    };
    var newComment = new commentModel(model);
    newComment.save((err) => {
        if (err){
            console.log(err);
            res.send({ err_msg: 'You cannot post commnet now, Sorry' });
        }
        else
            res.send({ success_msg: 'You post a new comment' });
    });
    
});

router.delete('/deletecomment', (req,res) =>{
    commentModel.deleteOne({ _id: req.body._id }, (err,result) => {
        if (err)
            res.send({ err_msg: 'You cannot delete this comment now, Sorry' });
        else if (result)
            res.send({ success_msg: 'You delete the comment' });
    });
});

router.put('/editcomment', (req,res) => {
    var newComment = { comment: req.body.newComment };
    commentModel.updateOne({ userId: req.session.userId, _id: req.body._id }, newComment, (err,result) => {
        if (err)
            res.send({ err_msg:'You cannot edit your comment now, Sorry' });
        else if (result.n > 0)
            res.send({ success_msg:'Your comment is modified' });
    });
});

router.post('/getComment', (req,res) => {
    console.log(req.body.cardId);
    commentModel.find({ cardId: req.body.cardId }).populate('userId').populate('cardId').exec((err, result) => {
        if (err)
            console.log(err);
        else 
            res.send(result);
    });
});


module.exports = router;