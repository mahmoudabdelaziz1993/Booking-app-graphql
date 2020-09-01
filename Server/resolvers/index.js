// const Event = require('../models/Event')
// const User = require('../models/User')


// module.exports = {
//     hello: () => 'Hello Ninja!',
//     random: () => Math.random(),
//     events: async () => {
//         try {
//             let events = await Event.find().populate('author')
//             return events
//         } catch (error) {
//             throw error;
//         }
//     },
//     createEvent: async (args) => {
//         try {
//             let event = new Event({ ...args.input, date: new Date().toISOString() ,author :"5f4d839a8faa72312874dba9" })
//             await event.save()
//             return event
//         } catch (error) {
//             throw error
//         }
//     },
//     users : async ()=>{
//         try {
//             let users = await User.find().populate('createdEvents')
//             return users
//         } catch (error) {
//             throw error
//         }

//     },
//     createUser: async (args) => {
//         try {
//             let user = new User({ ...args.input })
//             await user.save()
//             return user
//         } catch (error) {
//             throw error
//         }
//     }

// };



// new data

const eventResolvers= require( './events')
const userResolvers= require( './users')
const palygroundResolvers= require( './playground')



 const root = {
    ... eventResolvers,
    ... userResolvers,
    ...palygroundResolvers
}

module.exports = root ;