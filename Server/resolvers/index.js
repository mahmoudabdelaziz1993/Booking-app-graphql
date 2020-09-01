const eventResolvers= require( './events')
const userResolvers= require( './users')
const palygroundResolvers= require( './playground')

 const root = {
    ... eventResolvers,
    ... userResolvers,
    ...palygroundResolvers
}

module.exports = root ;