const mongoose = require('mongoose');

const task = mongoose.Schema({

    task:{String},
    tag:String,
    priority:String,
    deadline:Date,

},

)