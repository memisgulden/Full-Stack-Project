const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost3000');

//define how we want user records to look//
const userSchema = new Schema ({
    username: String,
    googleId: String,
    thumbnail: String,
    // useremail: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;