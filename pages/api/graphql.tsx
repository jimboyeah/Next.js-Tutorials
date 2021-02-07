import { ApolloServer, gql } from 'apollo-server-micro'
import { GraphQLResolveInfo } from 'graphql'
////////////////////////////////////////////////////////////
const typeDefs = gql`
  type Query {
    sayHello: String
    users(name: String): [User!]!
  }
  type User {
    name: String
  }
`
let count = 0
const resolvers = {
  Query: {
    sayHello(parent, args, context, info: GraphQLResolveInfo) {
      console.log("sayHello()", parent, args, context);
      return 'Hello World!';
    },
    users(parent, args, context, info: GraphQLResolveInfo) {
      console.log("users()", parent, args, context);
      let name = args.name ?? 'Next.js'
      return [{ name: `${name}-${count++}` }]
    },
  },
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
