const {ApolloServer, gql} = require('apollo-server');
const resolvers = require('./resolvers');
const {importSchema} = require("graphql-import");

const server = new ApolloServer({
    typeDefs:importSchema('./schema/index.graphql'),
    resolvers:resolvers
});

const serviceAccount = require('./fiapkerrbanco-firebase-adminsdk-auuyk-3df7654617.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fiapkerrbanco-default-rtdb.firebaseio.com/",
  });

  
server.listen().then(({url})=>console.log(`Servidor online ... ${url}`))

