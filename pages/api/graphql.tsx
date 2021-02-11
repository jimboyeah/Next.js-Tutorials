import { ApolloServer, gql } from 'apollo-server-micro'
import { buildSchema, GraphQLResolveInfo } from 'graphql'
////////////////////////////////////////////////////////////
// const typeDefs = buildSchema(`
const typeDefs = gql(`
  type Query {
    count: Int
    sayHello(msg:String, time:Int): String
    users( name: String): [User!]!
    books(title: String): [Book]
  }
  type User {
    description: String
    id: ID
    name: String
  }
  type Book {
    author: User
    title: String
  }
  type Mutation {
    createUser(name: String): User
    removeUser(id: String): User
  }
`)
let count = 0
let users = [
  {id:"00", name:"Eric S. Roberts"},
  {id:"01", name:"Jeango"},
  {id:"02", name:"Frank"},
]
let books = [
  {title:"Getting Started from JavaScript to Vue", author: users[0]},
  {title:"the Art & Science of C Programming", author: users[2]},
]
const resolvers = {
  Query: {
    count(parent:any, args:any, context:any, info: GraphQLResolveInfo) {
      return count++
    },
    sayHello(parent:any, args:any, context:any, info: GraphQLResolveInfo) {
      return args.msg ?? 'Hello World!';
    },
    users(parent:any, args:any, context:any, info: GraphQLResolveInfo) {
      if(!args.name) return users
      let found = users.find((it, ik) => (it.name===args.name))
      console.log("found", found)
      return found? [found]:[]
      
    },
    books(parent:any, args:{title:string}, context:any, info:GraphQLResolveInfo) {
      if(!args.title) return books
      return [books.find( it => it.title==args.title)]
    }
  },
  Mutation : {
    createUser(parent: any, {name}: any){
      let user = { id: users.length+"", name}
      users.push(user)
      return user
    },
    removeUser(parent: any, {id}: any){
      let user = users.find( (it, ik) => {
        (it.id === id) && delete(users[ik])
        return (it.id === id)
      })
      users = users.filter( it => !!it )
      return user
    }
  }
}
////////////////////////////////////////////////////////////
export const config = {
  api: {
    bodyParser: false, // don't parse request body
  },
}
// curl localhost:3000/api/graphql?a=a -d "{""a"":1}" -H "Content-Type: binary/octet-stream"
// export default async (req:NextApiRequest, res:NextApiResponse) => {
//    res.json({query: req.query, body: req.body})
// }

// curl localhost:3000/api/graphql -d "{""query"":""{users{name}}""}" -H "Content-Type: application/json"
// curl localhost:3000/api/graphql -d "{""query"":""{users(name:\\""Walle\\""){name}}""}" -H "Content-Type: application/json"
const apolloServer = new ApolloServer({ typeDefs, resolvers })
export default apolloServer.createHandler({ path: '/api/graphql' })
