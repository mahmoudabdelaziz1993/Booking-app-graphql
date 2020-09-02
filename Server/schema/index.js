const { buildSchema } = require('graphql');

module.exports = buildSchema(
`
    input TweetInput {
    body: String!
    author: ID!,
    }
    input UserInput {
    name: String!
    email: String!
    password: String!
    }

    input LikeInput {
    tweetId: ID!,
    userId: ID!,
    }


    input CommentInput {
    tweetId: ID!,
    userId: ID!,
    body: String!
    }


    type  User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    createdTweets: [Tweet]
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
    }

    type AuthData {
    _id: ID!
    token: String!
    }

    type Tweet {
    _id: ID!
    body: String!
    author: User!
    likesCount: Int
    createdAt: String!
    updatedAt: String!
    comments: [Comment]
    }

    type Comment {
    _id: ID!
    body: String!
    author: User!
    createdAt: String!
    updatedAt: String!
    }



    type Query {
    hello: String
    random: Float!
    tweets: [Tweet!]!
    users: [User!]!
    login(email: String!, password: String!): AuthData
    }



    type Mutation {
        createUser(input: UserInput): User
        createTweet(input: TweetInput): Tweet
        like(input: LikeInput): Tweet
        deleteTweet(input: LikeInput): Boolean
        updateTweet(input: CommentInput): Tweet
        createComment(input: CommentInput): Tweet
       
    }
    `

);