#!/bin/sh

export NEO4J_URI=bolt://hobby-xxxxxxxx.dbs.graphenedb.com:24787
export NEO4J_USER=user
export NEO4J_PASSWORD=b.pxxxxxxxxxxxxxxx

export PORT=3000

node app.js
