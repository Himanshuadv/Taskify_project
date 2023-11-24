const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    noteId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    note : {
        type: String,
        required : true
    },
    reminderText : {
        type: String,
    },
    seen : {
        type: Boolean,
        required : true
    }
}, {
    timestamps: true,
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;