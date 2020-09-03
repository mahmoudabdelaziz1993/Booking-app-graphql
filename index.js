const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
if(process.env.NODE_ENV !== "production"){ require('dotenv').config()}
const appSchema = require('./schema/index')
const appResolvers = require('./resolvers/index')
const IsAuth = require('./middleware/is-Auth')





const app = express();
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(IsAuth)


app.get('/',(req,res)=>{
    res.sendfile('/index.html')
})
// GraphQi meddileware
app.use('/graphql', graphqlHTTP({
    schema: appSchema,
    rootValue: appResolvers,
    graphiql: true,
}));


mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.once('open', () => console.log("🚀 connected to mongo db successfully"));
app.listen(process.env.PORT);
console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`);