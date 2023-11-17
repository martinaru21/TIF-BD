const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

// Configuracion de la conexion al server de MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'edinburgo2030',
    database: 'tif',
});

// Conexion al server de MySQL
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
  });
  
  // Set up body parser middleware to parse POST request data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  // Set the view engine to ejs
  app.set('view engine', 'ejs');

  // *************PAGINA PRINCIPAL*************
  app.get('/', (req, res) => {
    res.send(`
      <h1>Menu Principal</h1>
      <button onclick="location.href='/consultas'">Consultas</button>
      <button onclick="location.href='/admin'">Administrador</button>
    `);
  });

  //*************MENU CONSULTAS*************
  app.get('/consultas', (req, res) => {
    res.send(`
      <h1>Cosnultas</h1>
      <button onclick="location.href='/showBugTable'">Show Bug Table</button>
      <button onclick="location.href='/showSedeTable'">Show Sede Table</button>
      <button onclick="location.href='/showDevTable'">Show Dev Table</button>
    `);
  });

  //*************MENU ADMIN*************
  app.get('/admin', (req, res) => {
    res.send(`
      <h1>Administrador</h1>
      <button onclick="location.href='/bugMenu'">Bugs</button>
      <button onclick="location.href='/sedeMenu'">Sedes</button>
      <button onclick="location.href='/equipMenu'">Equipamiento</button>
      <button onclick="location.href='/devMenu'">Developers</button>
      <button onclick="location.href='/designerMenu'">Designers</button>
      <button onclick="location.href='/artistMenu'">Artistas</button>
      <button onclick="location.href='/testerMenu'">Testers</button>
      <button onclick="location.href='/assetMenu'">Assets</button>
      <button onclick="location.href='/featMenu'">Features</button>
      <button onclick="location.href='/pjMenu'">Personajes</button>
      <button onclick="location.href='/sfxMenu'">SFX/Musica/Sprites</button>
      <button onclick="location.href='/animationMenu'">Animaciones</button>
      <button onclick="location.href='/vlMenu'">Lineas de Voz</button>
    `);
  });

    //*************MENU BUGS*************
    app.get('/bugMenu', (req, res) => {
        res.send(`
          <h1>Administrador: Bugs</h1>
          <button onclick="location.href='/bugInsertForm'">Nuevo</button>
          <button onclick="location.href='/bugInsertForm'">Modificar</button>
          <button onclick="location.href='/bugInsertForm'">Insertar</button>
        `);
      });
  
  //*************MENU SEDE*************
  app.get('/sedeMenu', (req, res) => {
    res.send(`
      <h1>Administrador: Sedes</h1>
      <button onclick="location.href='/sedeInsertForm'">Nuevo</button>
      <button onclick="location.href='/updateSede'">Modificar</button>
      <button onclick="location.href='/sedeInsertForm'">Insertar</button>
    `);
  });

    //*************MENU EQUIPAMIENTO*************
    app.get('/equipMenu', (req, res) => {
        res.send(`
          <h1>Administrador: Equipamiento</h1>
          <button onclick="location.href='/sedeInsertForm'">Nuevo</button>
          <button onclick="location.href='/sedeInsertForm'">Modificar</button>
          <button onclick="location.href='/sedeInsertForm'">Insertar</button>
        `);
      });

  //*************MENU DEVELOPERS*************
  app.get('/devMenu', (req, res) => {
    res.send(`
      <h1>Administrador: Developers</h1>
      <button onclick="location.href='/sedeInsertForm'">Nuevo</button>
      <button onclick="location.href='/sedeInsertForm'">Modificar</button>
      <button onclick="location.href='/sedeInsertForm'">Insertar</button>
    `);
  });

//*************MENU DESIGNERS*************
  app.get('/designerMenu', (req, res) => {
    res.send(`
      <h1>Administrador: Designers</h1>
      <button onclick="location.href='/sedeInsertForm'">Nuevo</button>
      <button onclick="location.href='/sedeInsertForm'">Modificar</button>
      <button onclick="location.href='/sedeInsertForm'">Insertar</button>
    `);
  });




//*************MOSTRAR TABLAS*************
  
//*************TABLA BUG (NO ANDA)*************
 // Route to show the BUG table
  app.get('/showBugTable', (req, res) => {
    // Query to select data from the BUG table
  
    // Execute the query
    connection.query('SELECT * FROM BUG', function(err, results) {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Render the data in an HTML table
      const tableRows = results.map((row) => {
        return `<tr>
          <td style="max-width: 100px; overflow: auto; text-overflow: ellipsis;white-space: nowrap;">${row.id_bug}</td>
          <td style="max-width: 100px; overflow: auto; text-overflow: ellipsis;white-space: nowrap;">${row.titulo}</td>
          <td style="max-width: 100px; overflow: auto; text-overflow: ellipsis;white-space: nowrap;">${row.descripcion}</td>
          <td>${row.prioridad}</td>
          <td style="max-width: 100px; overflow: auto; text-overflow: ellipsis;white-space: nowrap;">${row.archivo_evidencia}</td>
          <td>${row.fecha_reporte}</td>
          <td>${row.fecha_solucion}</td>
          <td style="max-width: 100px; overflow: auto; text-overflow: ellipsis;white-space: nowrap;">${row.idFeature}</td>
          <td style="max-width: 100px; overflow: auto; text-overflow: ellipsis;white-space: nowrap;">${row.idEscenario}</td>
          <td style="max-width: 100px; overflow: auto; text-overflow: ellipsis;white-space: nowrap;">${row.userTester}</td>
        </tr>`;
      });
  
      const tableHtml = `<style>
        table {
          border-collapse: collapse;
          word-break: break-word;
          width: 100%;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
      </style>
      <h2>Data from BUG Table</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Evidence File</th>
          <th>Report Date</th>
          <th>Solution Date</th>
          <th>Feature ID</th>
          <th>Scenario ID</th>
          <th>Tester DNI</th>
        </tr>
        ${tableRows.join('')}
      </table>`;
  
      // Send the HTML response with the table
      res.send(tableHtml);
    });
  });
  
  // Serve the HTML form for inserting a bug
  app.get('/bugInsertForm', (req, res) => {
    res.sendFile(__dirname + '/bugInsertForm.html'); // Provide the path to your bugInsertForm.html file
  });
  
  // Handle the form submission for inserting a bug
  app.post('/insertBug', async (req, res) => {
    const { titulo, descripcion, prioridad, nombreEvidencia, idFeature, idEscenario, userTester } = req.body;
    
    connection.query("call crearBug(?, ?, ?, ?, ?, ?, ?)", [titulo, descripcion, prioridad, nombreEvidencia, idFeature, idEscenario, userTester], function (err, result)
    {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
    });
  });



//*************TABLA SEDE*************
// Route to show the SEDE table
app.get('/showSedeTable', (req, res) => {
    // Query to select data from the SEDE table
    const query = 'SELECT * FROM SEDE';
  
    // Execute the query
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Render the data in an HTML table
      const tableRows = results.map((row) => {
        return `<tr>
                  <td>${row.cuit}</td>
                  <td>${row.nombre_sede}</td>
                  <td>${row.pais}</td>
                  <td>${row.provincia}</td>
                  <td>${row.ciudad}</td>
                  <td>${row.codigoPostal}</td>
                  <td>${row.direccion}</td>
                  <td>${row.alquiler}</td>
                  <td>${row.capacidad}</td>
                </tr>`;
      });
  
      const tableHtml = `<h2>Data from SEDE Table</h2>
                          <table border="1">
                            <tr>
                              <th>CUIT</th>
                              <th>Nombre Sede</th>
                              <th>Pais</th>
                              <th>Provincia</th>
                              <th>Ciudad</th>
                              <th>Codigo Postal</th>
                              <th>Direccion</th>
                              <th>Alquiler</th>
                              <th>Capacidad</th>
                            </tr>${tableRows.join('')}</table>`;
  
      // Send the HTML response with the table
      res.send(tableHtml);
    });
  });



//*************TABLA DEVS+EMPLEADO*************
// Route to show the SEDE table
app.get('/showDevTable', (req, res) => {
    // SQL query to join EMPLEADO and DEVELOPER tables on the 'user' column
    const query = `
      SELECT E.user, E.dni, E.nombre_empleado, E.apellido_empleado, E.fecha_nac, 
             E.ingreso_empresa, E.ingreso_proyecto, E.sueldo, E.rubro, E.seniority, D.grupo
      FROM EMPLEADO E
      JOIN DEVELOPER D ON E.user = D.user`;
  
    // Execute the query
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Render the data in an HTML table
      const tableRows = results.map((row) => {
        return `<tr>
            <td>${row.user}</td>
            <td>${row.dni}</td>
            <td>${row.nombre_empleado}</td>
            <td>${row.apellido_empleado}</td>
            <td>${row.fecha_nac}</td>
            <td>${row.ingreso_empresa}</td>
            <td>${row.ingreso_proyecto}</td>
            <td>${row.sueldo}</td>
            <td>${row.rubro}</td>
            <td>${row.seniority}</td>
            <td>${row.grupo}</td>
          </tr>`;
      });
  
      const tableHtml = `<style>
                      table {
                        border-collapse: collapse;
                        word-break: break-word;
                        width: 100%;
                      }
                      th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                      }
                    </style>
                    <h2>Joined Data from EMPLEADO and DEVELOPER Tables</h2>
                    <table>
                      <tr>
                        <th>User</th>
                        <th>DNI</th>
                        <th>Nombre Empleado</th>
                        <th>Apellido Empleado</th>
                        <th>Fecha Nacimiento</th>
                        <th>Fecha Empresa</th>
                        <th>Fecha Proyecto</th>
                        <th>Sueldo</th>
                        <th>Rubro</th>
                        <th>Seniority</th>
                        <th>Grupo</th>
                      </tr>${tableRows.join('')}</table>`;
  
      // Send the HTML response with the table
      res.send(tableHtml);
    });
  });





//*************INSERTS*************
  // Serve the HTML form for inserting a SEDE
  app.get('/sedeInsertForm', (req, res) => {
    res.sendFile(__dirname + '/sedeInsertForm.html'); // Provide the path to your sedeInsertForm.html file
  });
  
  // Handle the form submission for inserting a SEDE
  app.post('/insertSede', async (req, res) => {
    const { cuit, nombre_sede, direccion, ciudad, provincia, pais, codigoPostal, alquiler, capacidad } = req.body;
    connection.query("call crearSede(?, ?, ?, ?, ?, ?, ?, ?, ?)", [cuit, nombre_sede, direccion, ciudad, provincia, pais, codigoPostal, alquiler, capacidad], function (err, result){
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
    });
  });



//*************UPDATES*************
// Route to render the initial form to enter SEDE CUIT
app.get('/updateSede', (req, res) => {
    res.sendFile(__dirname + '/enterSedeCUITForm.html');
  });
  
  // Route to handle the form submission and redirect to the update form
  app.post('/enterSedeCUIT', (req, res) => {
    const { cuit } = req.body;
  
    // Check if cuit is provided
    if (!cuit) {
      res.status(400).send('CUIT is required');
      return;
    }
  
    // Redirect to the update form with the provided CUIT
    res.redirect(`/updateThisSede/${cuit}`);
  });
  

  // Route to render the update form with SEDE data
  app.get('/updateThisSede/:cuit', (req, res) => {
    const cuit = req.params.cuit;
  
    // SQL query to check if the SEDE with the given CUIT exists
    const checkSedeQuery = `SELECT * FROM SEDE WHERE cuit = ${cuit}`;
  
    connection.query(checkSedeQuery, (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error checking SEDE:', checkErr);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Check if the SEDE with the given CUIT exists
      if (checkResults.length === 0) {
        res.status(404).send('SEDE not found');
        return;
      }
  
      // Render the update form with SEDE data
      res.render('updateSedeForm', { sedeData: checkResults[0] });
    });
  });







  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
