const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);
const {CheckConnection} = require('../repository/soisdb')

exports.SetMongo = (app) => {
  //mongodb
  mongoose.connect("mongodb://localhost:27017/SOIS").then((res) => {
    console.log("MongoDB Connected!");
  });

  const store = new MongoDBSession({
    uri: "mongodb://localhost:27017/SOIS",
    collection: "SOISSession",
  });

  //Session
  app.use(
    session({
      secret: "SOISSECRETKEY",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  );

  //Check SQL Connection
  CheckConnection();
};
