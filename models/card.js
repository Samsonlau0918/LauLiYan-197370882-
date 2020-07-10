const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
const Schema = mongoose.Schema;


const cardSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    COST: {type: Int32},
    AP:  {type: Int32},
    DP:  {type: Int32},
    Type: {type: String},
    Name: {type: String}, 
    DES: {type: String},
    Card_Num:  {type: Int32},
    IMG_URL: {type: String},
}, {collection: 'card'})


module.exports = mongoose.model('card', cardSchema);