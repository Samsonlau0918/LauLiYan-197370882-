const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myfavCardSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'users'
    },
    cardId: { 
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'card'
    },
});

module.exports = mongoose.model('myfavCard',myfavCardSchema);