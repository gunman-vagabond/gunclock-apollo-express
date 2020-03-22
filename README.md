# Gunclock GraphQL server

This project was generated with apollo, neo4j-driver, express

## backend neo4j(GrapheneDB) server

For using this project, you need prepare neo4j(GrapheneDB) server.

## GraphQL server

Edit `start.sh` with environment values indicating prepared neo4j server (NEO4J_URI/NEO4J_USER/NEO4J_PASSWORD).

Run `start.sh` for a GraphQL server. Access `http://localhost:3000/` and use GraphQL.

## usage: GraphQL API

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
- read

```
  { 
    Gunclock(
      uuid:"c52af318-c351-4e89-99c0-da8cad143898"
    )
    {
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

- create

```
  mutation {
    createGunclock(
      size:16,
      color:"0xffff88",
      cityName:"Tokyo",
      shortHandCastName:"gunman",
      longHandCastName:"uma"
    )
    {
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

- update

```
  mutation {
    updateGunclock(
      uuid:"c52af318-c351-4e89-99c0-da8cad143898"
      size:25,
      color:"0x88ffcc",
      cityName:"London",
      shortHandCastName:"oni",
      longHandCastName:"gunman2"
    )
    {
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


- delete

```
  mutation {
    deleteGunclock(
      uuid:"c52af318-c351-4e89-99c0-da8cad143898"
    )
  } { _id }
```

## example (heroku)

https://gunclock-neo4j.herokuapp.com/

