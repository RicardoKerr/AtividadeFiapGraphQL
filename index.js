const {ApolloServer, gql} = require('apollo-server')

const resolvers = {
    
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.listen().then(({url})=>console.log(`Servidor online ... ${url}`))