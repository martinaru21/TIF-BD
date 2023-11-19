const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = 3000;
const connection = require("./connectMySQL");
const principalRouter = require("./routes/principal.js");
const tablasRouter = require("./routes/tablas.js");
const insertsRouter = require("./routes/inserts.js");
const updatesRouter = require("./routes/updates.js");
const deletesRouter = require("./routes/deletes.js");
const queriesRouter = require("./routes/queries.js");

// Set up body parser middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to ejs
app.set("view engine", "ejs");

//*************PAGINA PRINCIPAL*************
app.use("/", principalRouter);

//*************MOSTRAR TABLAS*************
app.use("/tables/", tablasRouter);

//*************INSERTS*************
app.use("/inserts/", insertsRouter);

//*************UPDATES*************
app.use("/updates/", updatesRouter);

//*************DELETES*************
app.use("/deletes/", deletesRouter);

//*************QUERIES*************
app.use("/queries/", queriesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
<<<<<<< HEAD

app.get('/verAnimadoresEncargados', (req, res) => {
  const nombreEsc = req.query.nombreEsc;

  // Execute the stored procedure
  const query = 'CALL verAnimadoresEncargados(?)';
  connection.query(query, [nombreEsc], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

app.get('/verMiembrosDesigners', (req, res) => {
  const nombreGrDes = req.query.nombreGrDes;

  // Execute the stored procedure
  const query = 'CALL verMiembrosDesigners(?)';
  connection.query(query, [nombreGrDes], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

app.get('/verBugsReportados', (req, res) => {
  const username = req.query.username;

  // Execute the stored procedure
  const query = 'CALL verBugsReportados(?)';
  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

app.get('/verOcupacionEmpleados', async (req, res) => {
  const query = 'CALL verOcupacionEmpleados()';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

app.get('/verPromedioResolucion', (req, res) => {
  const nombreGrDev = req.query.nombreGrDev;

  // Execute the stored procedure
  const query = 'CALL verPromedioResolucion(?)';
  connection.query(query, [nombreGrDev], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

app.get('/empleadosDeGrupo', (req, res) => {
  const nombre = req.query.nombre;

  // Execute the stored procedure
  const query = 'CALL empleadosDeGrupo(?)';
  connection.query(query, [nombre], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

app.get('/verBugsFeatEsc', (req, res) => {
  const id_fe = req.query.id_fe;

  // Execute the stored procedure
  const query = 'CALL verBugsFeatEsc(?)';
  connection.query(query, [id_fe], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

app.get('/verEscCompl', (req, res) => {
  const grupo_fe = req.query.grupo_fe;

  // Execute the stored procedure
  const query = 'CALL verEscCompl(?)';
  connection.query(query, [grupo_fe], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

app.get('/verPromedioFinalizacion', (req, res) => {
  const nombreGrDev = req.query.nombreGrDev;

  // Execute the stored procedure
  const query = 'CALL verPromedioFinalizacion(?)';
  connection.query(query, [nombreGrDev], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

app.get('/verLineasDeVoz', (req, res) => {
  const nombreGrDev = req.query.nombreGrDev;

  // Execute the stored procedure
  const query = 'CALL verLineasDeVoz(?)';
  connection.query(query, [nombreGrDev], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});



  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
=======
exports.app = app;
>>>>>>> 6cc102db66bd7fd05738825d14b29ec15335e05e
