const User = require('../models/User')


module.exports ={

    users : async ()=>{
        try {
            let users = await User.find().populate('createdEvents')
            return users
        } catch (error) {
            throw error
        }

    },
    createUser: async (args) => {
        try {
            let user = new User({ ...args.input })
            await user.save()
            return user
        } catch (error) {
            throw error
        }
    }

}