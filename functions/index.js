const express = require("express");
//const {ApolloServer, gql} = require('apollo-server');
const { ApolloServer } = require("apollo-server-express");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// const serviceAccount = require("./fiapbancographql-firebase-adminsdk-b531i-8746c847e2.json");
const serviceAccount = require('./fiapkerrbanco-firebase-adminsdk-auuyk-3df7654617.json');

const resolvers = require("./resolvers");
const { importSchema } = require("graphql-import");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fiapkerrbanco-default-rtdb.firebaseio.com/",
});

const app = express();

const server = new ApolloServer({
  typeDefs: importSchema("./schema/index.graphql"),
  resolvers: resolvers,
});

server.applyMiddleware({ app, path: "/", cors: true });

exports.graphql = functions.https.onRequest(app);
