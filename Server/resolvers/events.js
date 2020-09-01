const Event = require('../models/Event')


module.exports = {

    events: async () => {
        try {
            let events = await Event.find().populate('author')
            return events
        } catch (error) {
            throw error;
        }
    },
    createEvent: async (args) => {
        try {
            let event = new Event({ ...args.input, date: new Date().toISOString(), author: "5f4d839a8faa72312874dba9" })
            await event.save()
            return event
        } catch (error) {
            throw error
        }
    },


}