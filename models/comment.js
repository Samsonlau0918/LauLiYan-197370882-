const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    cardId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'card'
    },
    comment: String
});

module.exports = mongoose.model('comment',commentSchema);