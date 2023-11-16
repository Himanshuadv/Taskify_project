const mongoose = require('mongoose');

const canvasSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    lines: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    title: {
        type: String,
    }
},
    {
        timestamps: true,
    });

const Canvas = mongoose.model("Canvas", canvasSchema);

module.exports = Canvas;