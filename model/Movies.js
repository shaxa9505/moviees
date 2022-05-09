const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    country: String,
    year: Number,
    director_id: Schema.Types.ObjectId,
    imdb_score: Number,
    createAtt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("movie", MoviesSchema);