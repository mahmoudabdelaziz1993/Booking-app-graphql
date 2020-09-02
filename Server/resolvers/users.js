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
    },
    login : async({email,password})=>{
        try {
            if (!email.length||!password.length) throw Error ('missing parameter')
            let user = await User.isValidUser(email,password)
            return user
        } catch (error) {
            return error
            
        }
    }

}