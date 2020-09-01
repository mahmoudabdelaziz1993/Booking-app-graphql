const Tweet = require('../models/Tweet')


module.exports = {

    tweets: async () => {
        try {
            let tweets =
                await Tweet
                    .find()
                    .populate(['author', {
                        path: 'comments',
                        populate: {
                            path: 'author',
                            model: 'User'
                        }
                    }])

            return tweets
        } catch (error) {
            throw error;
        }
    },

    like: async (args) => {
        try {
            let { tweetId, userId } = args.input
            if (!tweetId.length || !userId.length) throw new Error(' missing parameter  ')
            let tweet = await Tweet.findById(tweetId)
            if (!tweet) throw new Error(' Tweet not found !! ')
            tweet.likes.push({ _id: userId })
            await tweet.save()
            return tweet
        } catch (error) {
            throw new Error(" Couldn't you take actions")
        }
    },

    createTweet: async (args) => {
        try {
            let tweet = new Tweet({ ...args.input, date: new Date().toISOString() })
            await tweet.save()
            return tweet
        } catch (error) {
            throw error
        }
    },



    deleteTweet: async (args) => {
        try {
            let { tweetId, userId } = args.input
            if (!tweetId.length || !userId.length) throw new Error(' missing parameter ')
            const tweet = await Tweet.findById(tweetId)
            if (!tweet) throw new Error(' Tweet not found !! ')
            await Tweet.findByIdAndDelete(tweetId);
            return true
        } catch (error) {
            return error
        }
    },

    updateTweet: async (args) => {

        try {
            let { tweetId, userId, body } = args.input
            if (!tweetId.length || !userId.length || !body.length) throw new Error(' missing parameter ')
            let tweet = await Tweet.findById(tweetId)
            if (!tweet) throw new Error(' Tweet not found !! ')
            tweet = await Tweet.findByIdAndUpdate(tweetId, { body })
            return tweet

        } catch (error) {
            return error
        }


    },


    //comments 
    createComment: async (args) => {
        try {
            let { tweetId, userId, body } = args.input
            if (!tweetId.length || !userId.length || !body.length) throw new Error(' missing parameter ')
            let tweet = await Tweet.findById(tweetId)
            if (!tweet) throw new Error(' Tweet not found !! ')
            tweet.comments.push({ "author": { _id: userId }, body })
            console.log(tweet)
            await tweet.save()
            return tweet
        } catch (error) {
            throw new Error(" Couldn't you take actions")
        }

    },



}