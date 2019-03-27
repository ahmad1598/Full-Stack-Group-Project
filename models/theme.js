const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema ({
    themeId:{
        type: String,
        required: true
    },
    themeName:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Theme",themeSchema)