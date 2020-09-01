const { buildSchema } = require('graphql');

module.exports = buildSchema(`
input EventInput {
    title :String!
    description :String!
    price : Float!
   
   
}
input UserInput {
    name : String!
    email :String!
    password :String!
}

type  User {
    _id : ID!
    name : String!
    email :String!
    password :String!
    createdEvents : [Event]
    
}

type Event {
    _id : ID!
    title :String!
    description :String!
    price : Float!
    date :String!
    author: User!

}
  
type Query {
    hello: String
    random: Float!
    events : [Event!]!
    users : [User!]!
}


   
type Mutation {
       createUser (input : UserInput) : User
       createEvent (input : EventInput) : Event
}

`);