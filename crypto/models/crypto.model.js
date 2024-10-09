const mongoose = require("mongoose");
const cryptoSchema = new mongoose.Schema({
    coinId:{
        type:String,
        required: true,
    },
    name: {
        type: String,
    },
    price: { 
        type: Number,
        required: true,
    },
    cap:{
        type: Number,
        required: true,
    },
    change:{
        type: Number,
        required: true,
    }
},{timestamps: true});
module.exports = mongoose.model("Crypto", cryptoSchema);