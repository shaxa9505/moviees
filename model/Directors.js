const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const directorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    surname: String,
    bio: String,
    createAtt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("director", directorSchema)