const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const { schema } = require('./User');


// comment schema 
const CommentSchema = new Schema({
    body : { type: String, required: true },
    author : {required : true ,type : Schema.Types.ObjectId , ref : 'User'}
    
}, {timestamps: true})



// tweets schema 
const TweetSchema = new Schema({
    body : { type: String, required: true },
    author : {required : true ,type : Schema.Types.ObjectId , ref : 'User'},
    comments : [CommentSchema],
    likes : [{
        type : Schema.Types.ObjectId , ref : 'User'
    }]
   }, {timestamps: true});


   TweetSchema.pre('save' , async function (next) {
    if (!this.isModified('author')) return next();
    try {
       let user = await User.findById(this.author)
       user.createdTweets.push(this)
       await user.save();
       next()
    } catch (error) {
        throw error
    }

   });


   TweetSchema.virtual('likesCount').get(function(){
       return this.likes.length;
   })

module.exports = mongoose.model('Tweet', TweetSchema);