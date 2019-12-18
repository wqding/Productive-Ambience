const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        id: Number,
        username: String,
        password: String,
        //is it possible to have schema within a schema?
        config: []
    },
    {timestamps: true}
);

module.exports = mongoose.model("user", UserSchema);