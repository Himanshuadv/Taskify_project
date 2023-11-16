const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: { type: String, required: true },
    note: { type: String, required: true },
    priority: { type: String},
    checklist: {type: Array},
    tags: {type: Array},
    done: { type: Boolean, required: true},
    endDate: { type: Date}
}, {
    timestamps: true,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;