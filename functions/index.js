const express = require("express");
const {ApolloServer, gql} = require("apollo-server-express");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./fiapkerrbanco-firebase-adminsdk-auuyk-3df7654617.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fiapkerrbanco-default-rtdb.firebaseio.com/"
  });

const typeDefs = gql`
    type produto{
        id:Int
        nomeproduto:String
        descricao:String
        fornecedor:String
        preco:Float
        datacadastro:String
    }
    type Query{
        produto:produto
    }
    type Mutation{
        novoproduto(
            id:Int
            nomeproduto:String
            descricao:String
            fornecedor:String
            preco:Float
            datacadastro:String
        ):produto
    }
`
const resolvers = {
    Query:{
        produto(){
            return admin
                    .database()
                    .ref("produto")
                    .once("values")
                    .then(snap => snap.val())
                    .then(val => Object.keys(val))
                    .map((key)=>val[key])
             }
         },
        
         Mutation:{
            novoproduto(_,{id,nomeproduto,descricao,fornecedor,preco,datacadastro}){
                const novo = {
                id:id,
                nomeproduto:nomeproduto,
                descricao:descricao,
                fornecedor:fornecedor,
                preco:preco,
                datacadastro:datacadastro
            }
            return admin.database()
            .ref("produto")
            .push(novo)
            .then(snap => snap.val())
            .then(val => Object.keys(val))
            .map((key)=>val[key])
        }
    }
}

const app = express()

const server = new ApolloServer({
    typeDefs,resolvers
})

server.applyMiddleware({app,path:"/",cors:true})

exports.graphql = functions.https.onRequest(app)


