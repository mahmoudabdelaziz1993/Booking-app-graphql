const tweetResolvers= require( './tweets')
const userResolvers= require( './users')
const palygroundResolvers= require( './playground')

 const root = {
    ... tweetResolvers,
    ... userResolvers,
    ...palygroundResolvers
}

module.exports = root ;