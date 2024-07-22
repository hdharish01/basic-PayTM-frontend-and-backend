const mongoose = require("mongoose");
const { string } = require("zod");
mongoose.connect("mongodb+srv://admin:f3C7A2LsRBoL4DPp@cluster0.lpvmjpr.mongodb.net/paytm");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50
    }
});
const accountSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})



const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account', accountSchema)
module.exports = {
    User,
    Account,
}