# Gunclock GraphQL server

This project was generated with apollo, neo4j-driver, express

## backend neo4j(GrapheneDB) server

For using this project, you need prepare neo4j(GrapheneDB) server.

### prepare City/Cast nodes on neo4j server
- City
```
CREATE
 (c1: City { name: "Tokyo" } ),
 (c2: City { name: "Shanghai" } ),
 (c3: City { name: "Sydney" } ),
 (c4: City { name: "Moscow" } ),
 (c5: City { name: "Berlin" } ),
 (c6: City { name: "Paris" } ),
 (c7: City { name: "London" } ),
 (c8: City { name: "Cairo" } ),
 (c9: City { name: "NewYork" } ),
 (c10: City { name: "LosAngeles" } ),
 (c11: City { name: "Sao_Paulo" } )
```

- Cast
```
CREATE
  (c1: Cast { name: "gunman", 
   text:[
      "** __ *", 
      " _|__|_",
      "b (@@) ",
      " V|~~|>",
      "* //T| "
   ] }
  ),
  (c2: Cast { name: "uma", 
   text:[
      "__AA  **",
      "| 6 |__P",
      "~~|    l",
      "*/_/~l_l"
   ] }
  ),
  (c3: Cast { name: "gunman2", 
   text:[
      "** __ *",
      " _|__|_",
      "  (xx; ",
      " /|~~|>",
      "P //T| "
   ] }
  ),
  (c4: Cast { name: "oni", 
   text:[
      "/| A_A  ",
      "|||-.-| ",
      "||_|-/_ ",
      "||. ~. |"
   ] }
  )
```

## install

- install node.js application
```
git clone https://github.com/gunman-vagabond/gunclock-apollo-express
cd gunclock-apollo-express/
npm install
```

## run GraphQL server

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
    { _id }
  } 
```

## example (heroku)

https://gunclock-neo4j.herokuapp.com/

