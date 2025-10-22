const mongoose = require("mongoose")

const profileSchema = mongoose.Schema({
    profilePic: String,
    fullName: String,
    userName: String,
    bio: String,
    companyName: String,
    city: String,
    portfolioLink: String,
    handle: String,
    followersCount: Number,
    followingCount: Number,
    isOnline: Boolean
})

const Twitter = mongoose.model("Twitter", profileSchema)
module.exports = Twitter;