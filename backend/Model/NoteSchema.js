const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    note : {
        type: String,
        required : true
    },
    title: {
        type: String,
        required : true
    },
    color : {
        type: String,
    },
    reminder : {
        type: Date,
    },
    reminderText : {
        type: String,
    }
}, {
    timestamps: true,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;