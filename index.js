const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    type Produto{
        id:Int
        nomeproduto:String
        descricao:String
        fornecedor:String
        preco:Float
        datacadastro:String       
    }

    type Query{
        produto:Produto
    }
`
const resolvers = {
    Query:{
        produto(){
            return{
                id:45,
                nomeproduto:"mouse",
                descricao:"mouse sem fio",
                fornecedor:"DELL",
                preco:100.00,
                datacadastro:"15/12/2020"
            }
        }
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.listen().then(({url})=>console.log(`Servidor online ... ${url}`))