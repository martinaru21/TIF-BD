const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;
const connection = require('./connectMySQL');
const principalRouter = require("./routes/principal.js")
const tablasRouter = require("./routes/tablas.js")
const insertsRouter = require("./routes/inserts.js")
const updatesRouter = require("./routes/updates.js")


  // Set up body parser middleware to parse POST request data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Set the view engine to ejs
  app.set('view engine', 'ejs');

  //*************PAGINA PRINCIPAL*************
  app.use('/', principalRouter);

  //*************MOSTRAR TABLAS*************
  app.use('/tables/', tablasRouter);

  //*************INSERTS*************
  app.use('/inserts/', insertsRouter);

  //*************UPDATES*************
  app.use('/updates/', updatesRouter);

  //*************DELETES*************
  app.use('/deletes/', deletesRouter);

  exports.app = app;
