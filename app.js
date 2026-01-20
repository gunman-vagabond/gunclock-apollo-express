const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeAugmentedSchema, neo4jgraphql } = require('neo4j-graphql-js');
const neo4j = require('neo4j-driver').v1;
//const neo4j = require('neo4j-driver');
const bodyParser = require('body-parser');

const typeDefs = `
  type Gunclock {
    _id : ID! 
    uuid : ID!
    size: Int
    color: String
    city: City @relation(name: "city", direction: OUT)
    shortHandCast: Cast @relation(name: "shortHandCast", direction: OUT)
    longHandCast: Cast @relation(name: "longHandCast", direction: OUT)
  }
  type City {
    name: String
  }
  type Cast {
    name: String
    text: [String]
  }
  type Query {
      Gunclock( _id: ID, uuid: ID, size: Int, color: String ): [Gunclock]
      City( name: String ): [City]
      Cast( name: String, text: [String] ): [Cast]
  }
  type Mutation {

      createGunclock(size: Int, color: String, cityName: String, shortHandCastName: String, longHandCastName: String ): Gunclock
        @cypher(statement: "MATCH ( c:City{name: $cityName} ) MATCH ( shcast:Cast {name: $shortHandCastName} ) MATCH ( lhcast:Cast {name: $longHandCastName} ) CREATE ( g:Gunclock {uuid: apoc.create.uuid(), size: $size, color:$color} ) MERGE (g)-[:city]->(c) MERGE (shcast)<-[:shortHandCast]-(g)-[:longHandCast]->(lhcast) RETURN g" )

      updateGunclock( uuid: ID, size: Int, color: String, cityName: String, shortHandCastName: String, longHandCastName: String ): Gunclock
        @cypher(statement: "MATCH ( g:Gunclock {uuid: $uuid} ) MATCH ( c:City{name: $cityName} ) MATCH ( shcast:Cast {name: $shortHandCastName} ) MATCH ( lhcast:Cast {name: $longHandCastName} ) MATCH (g)-[r]->() DELETE r SET g.size = $size SET g.color = $color MERGE (g)-[:city]->(c) MERGE (shcast)<-[:shortHandCast]-(g)-[:longHandCast]->(lhcast) RETURN g" )

      deleteGunclock( uuid: ID ): Gunclock
        @cypher(statement: "MATCH ( g:Gunclock {uuid: $uuid} ) MATCH (g)-[r]->() DELETE r DELETE g" )
  }
`;

// Provide resolver functions for your schema fields
const _resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
const resolvers = {
  Query: {
    Gunclock(obj, args, ctx, info){
      return neo4jgraphql(obj, args, ctx, info)
    },
    City(obj, args, ctx, info){
      return neo4jgraphql(obj, args, ctx, info)
    },
    Cast(obj, args, ctx, info){
      return neo4jgraphql(obj, args, ctx, info)
    },
  },
  Mutation: {
    createGunclock(obj, args, ctx, info){
      return neo4jgraphql(obj, args, ctx, info)
    },
    updateGunclock(obj, args, ctx, info){
      return neo4jgraphql(obj, args, ctx, info)
    },
    deleteGunclock(obj, args, ctx, info){
      return neo4jgraphql(obj, args, ctx, info)
    },
  }
};

const schema = makeAugmentedSchema({
  typeDefs,
  config: {
    query: true,
    mutation: true 
  }
})

const neo4jUri = process.env.NEO4J_URI           || process.env.GRAPHENEDB_BOLT_URL
const neo4jUser = process.env.NEO4J_USER         || process.env.GRAPHENEDB_BOLT_USER
const neo4jPassword = process.env.NEO4J_PASSWORD || process.env.GRAPHENEDB_BOLT_PASSWORD

const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic(neo4jUser, neo4jPassword),
  { encrypted: 'ENCRYPTION_OFF' }
)

const server = new ApolloServer({ 
  schema, 
//  mocks: true,
  resolvers,
  context: ({ req }) => {
    return {
      driver,
      req,
    }
  },
  introspection: true,
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  }
 });

const app = express();
app.use(bodyParser.json())

server.applyMiddleware({ app, path: '/' });

const port = process.env.PORT || 3000;

app.listen({port: port}, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
