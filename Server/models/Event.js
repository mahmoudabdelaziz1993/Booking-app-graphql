const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User')

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { required: true, type: String },
    price: { required: true, type: Number },
    date : { required: true, type: Date},
    author : {required : true ,type : Schema.Types.ObjectId , ref : 'User'}
   }, {timestamps: true});


   EventSchema.pre('save' , async function (next) {
    if (!this.isModified('author')) return next();
    try {
       let user = await User.findById(this.author)
       user.createdEvents.push(this)
       await user.save();
       next()
    } catch (error) {
        throw error
    }

   });



module.exports = mongoose.model('Event', EventSchema);