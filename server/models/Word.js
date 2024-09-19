import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    taboo: {
        type: [String],
        required: true
    },
    point: {
        type: Number,
        required: true
    }
});

const Word = mongoose.model('Word', wordSchema);

export default Word;