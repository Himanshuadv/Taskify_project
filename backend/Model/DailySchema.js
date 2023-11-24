const mongoose = require('mongoose');

const dailySchema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: { type: String, required: true },
    note: { type: String },
    done: { type: Boolean, required: true},
    checklist: {type: Array},
    seen: {type: Array},
    tags: {type: Array},
}, {
    timestamps: true,
});

const Daily = mongoose.model("Daily", dailySchema);

module.exports = Daily;