const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdEvents :[
        {
            type:Schema.Types.ObjectId ,
            ref : 'Event'
        }
    ]
} , {timestamps: true})

/** Hashing password  */
UserSchema.pre('save', async function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User' , UserSchema)