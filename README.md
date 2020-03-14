# Gunclock GraphQL server

This project was generated with apollo, neo4j-driver, express

## backend neo4j(GrapheneDB) server

For using this project, you need prepare neo4j(GrapheneDB) server.

## GraphQL server

Edit `start.sh` with environment values indicating prepared neo4j server (NEO4J_URI/NEO4J_USER/NEO4J_PASSWORD).

Run `start.sh` for a GraphQL server. Access `http://localhost:3000/` and use GraphQL.

## usage

- read (all gunclocks)

```
  { 
    Gunclock {
      _id,
      uuid,
      size,
      color
    }
  }
```

```
  { 
    Gunclock {
      _id,
      uuid,
      size,
      color,
      city{name},
      shortHandCast{text},
      longHandCast{text}
    }
  }
```

