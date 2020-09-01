const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdTweets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
}, { timestamps: true })


/** Comparing hashed password   */
UserSchema.methods.comparePassword = async function (pass) {
    password = pass.toString();
    return await bcrypt.compare(password, this.password);
};

UserSchema.statics.isValidUser = async function (email, password) {
    try {
        let user = await this.findOne({ email });
        let check = await user.comparePassword(password);
        if (check) return user;
    } catch (error) {
        throw new Error('user is not exist :( ');
    }

}

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

module.exports = mongoose.model('User', UserSchema)