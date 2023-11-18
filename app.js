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
    password: '123456',
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
      <h1>Consultas</h1>
      <button onclick="location.href='/showBugTable'">Show Bug Table</button>
      <button onclick="location.href='/showSedeTable'">Show Sede Table</button>
      <button onclick="location.href='/showDevTable'">Show Dev Table</button>
      <button onclick="location.href='/showEquipamientoTable'">Show Equipamiento Table</button>
      <button onclick="location.href='/showAssetTable'">Show Asset Table</button>
      <button onclick="location.href='/showPjTable'">Show Personaje Table</button>
      <button onclick="location.href='/showSmsTable'">Show SFX/Musica/Sprites Table</button>

    `);
  });

  //*************MENU ADMIN*************
  app.get('/admin', (req, res) => {
    res.send(`
      <h1>Administrador</h1>
      <button onclick="location.href='/bugMenu'">Bugs</button>
      <button onclick="location.href='/sedeMenu'">Sedes</button>
      <button onclick="location.href='/equipMenu'">Equipamiento</button>
      <button onclick="location.href='/developerMenu'">Developers</button>
      <button onclick="location.href='/designerMenu'">Designers</button>
      <button onclick="location.href='/artistaMenu'">Artistas</button>
      <button onclick="location.href='/testerMenu'">Testers</button>
      <button onclick="location.href='/assetMenu'">Assets</button>
      <button onclick="location.href='/pjMenu'">Personajes</button>
      <button onclick="location.href='/featMenu'">Features</button>
      <button onclick="location.href='/smsMenu'">SFX/Musica/Sprites</button>
      <button onclick="location.href='/animationMenu'">Animaciones</button>
      <button onclick="location.href='/vlMenu'">Lineas de Voz</button>
    `);
  });

    //*************MENU BUGS*************
    app.get('/bugMenu', (req, res) => {
        res.send(`
          <h1>Administrador: Bugs</h1>
          <button onclick="location.href='/bugInsertForm'">Nuevo</button>
          <button onclick="location.href='/updateBug'">Modificar</button>
          <button onclick="location.href='/deleteBug'">Borrar</button>
        `);
      });
  
  //*************MENU SEDE*************
  app.get('/sedeMenu', (req, res) => {
    res.send(`
      <h1>Administrador: Sedes</h1>
      <button onclick="location.href='/sedeInsertForm'">Nuevo</button>
      <button onclick="location.href='/updateSede'">Modificar</button>
      <button onclick="location.href='/deleteSede'">Borrar</button>
    `);
  });

    //*************MENU EQUIPAMIENTO*************
    app.get('/equipMenu', (req, res) => {
        res.send(`
          <h1>Administrador: Equipamiento</h1>
          <button onclick="location.href='/sedeInsertForm'">Nuevo</button>
          <button onclick="location.href='/sedeInsertForm'">Modificar</button>
          <button onclick="location.href='/deleteEquipamiento'">Borrar</button>
        `);
      });

  //*************MENU DEVELOPERS*************
  app.get('/developerMenu', (req, res) => {
    res.send(`
      <h1>Administrador: Developers</h1>
      <button onclick="location.href='/developerInsForm'">Nuevo</button>
      <button onclick="location.href='/developerModForm'">Modificar</button>
      <button onclick="location.href='/developerDelForm'">Eliminar</button>
    `);
  });

//*************MENU DESIGNERS*************
  app.get('/designerMenu', (req, res) => {
    res.send(`
      <h1>Administrador: Designers</h1>
      <button onclick="location.href='/designerInsForm'">Nuevo</button>
      <button onclick="location.href='/designerModForm'">Modificar</button>
      <button onclick="location.href='/designerDelForm'">Eliminar</button>
    `);
  });

//*************MENU ARTISTAS*************
app.get('/artistaMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Artistas</h1>
    <button onclick="location.href='/sedeInsertForm'">Nuevo</button>
    <button onclick="location.href='/sedeInsertForm'">Modificar</button>
    <button onclick="location.href='/sedeInsertForm'">Insertar</button>
  `);
});

//*************MENU TESTERS*************
app.get('/testerMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Tester</h1>
    <button onclick="location.href='/sedeInsertForm'">Nuevo</button>
    <button onclick="location.href='/sedeInsertForm'">Modificar</button>
    <button onclick="location.href='/sedeInsertForm'">Insertar</button>
  `);
});

//*************MENU ASSETS*************
app.get('/assetMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Asset</h1>
    <button onclick="location.href='/assetInsertForm'">Nuevo</button>
    <button onclick="location.href='/updateAsset'">Modificar</button>
  `);
});

//*************MENU PERSONAJES*************
app.get('/pjMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Personajes</h1>
    <button onclick="location.href='/pjInsertForm'">Nuevo</button>
    <button onclick="location.href='/updatePj'">Modificar</button>
  `);
});

//*************MENU FEATURE*************
app.get('/featMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Features</h1>
    <button onclick="location.href='/featInsertForm'">Nuevo</button>
    <button onclick="location.href='/updatefeat'">Modificar</button>
  `);
});

//*************MENU SFX/MUSICA/SPRITE*************
app.get('/smsMenu', (req, res) => {
  res.send(`
    <h1>Administrador: SFX/Musica/Sprites</h1>
    <button onclick="location.href='/smsInsertForm'">Nuevo</button>
    <button onclick="location.href='/updateSms'">Modificar</button>
  `);
});

//*************MOSTRAR TABLAS*************
  
//*************TABLA BUG*************
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
        const reportDate = new Date(row.fecha_reporte).toLocaleDateString('en-GB');
        var resolutionDate = new Date(row.fecha_solucion).toLocaleDateString('en-GB');
        if(resolutionDate === '31/12/1969') resolutionDate = '-';
        return `<tr>
          <td>${row.id_bug}</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${row.titulo_bug}</td>
          <td style="max-width: 200px; overflow: auto; max-height: 50px;">${row.desc_bug}</td>
          <td>${row.prioridad}</td>
          <td>${row.archivo_evidencia}</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${reportDate}</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${resolutionDate}</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${row.id_feature || '-'}</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${row.id_escenario || '-'}</td>
          <td>${row.tester_user}</td>
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
          <th>Resolution Date</th>
          <th>Feature ID</th>
          <th>Scenario ID</th>
          <th>Tester User</th>
        </tr>
        ${tableRows.join('')}
      </table>`;
  
      // Send the HTML response with the table
      res.send(tableHtml);
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

//*************TABLA ASSET*************
 // Route to show the ASSET table
 app.get('/showAssetTable', (req, res) => {

  // Execute the query
  connection.query('SELECT * FROM ASSET INNER JOIN ESCENARIO ON ASSET.id_escenario = ESCENARIO.id_escenario', function(err, results) {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      const creationDate = new Date(row.fecha_creacion).toLocaleDateString('en-GB');
      var endDate = new Date(row.fecha_finalizacion).toLocaleDateString('en-GB');
      if(endDate === '31/12/1969') endDate = '-';
      return `<tr>
        <td>${row.id_escenario}</td>
        <td >${row.animado}</td>
        <td >${row.nombre_escenario}</td>
        <td style="max-width: 200px; overflow: auto; max-height: 50px;">${row.descripcion_escenario}</td>
        <td>${creationDate}</td>
        <td>${endDate}</td>
        <td>${row.grupoDesigner}</td>
        <td>${row.grupoDeveloper}</td>
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
    <h2>Data from ASSET Table</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Animated</th>
        <th>Name</th>
        <th>Description</th>
        <th>Creation Date</th>
        <th>End Date</th>
        <th>Designer Group</th>
        <th>Developer Group</th>
      </tr>
      ${tableRows.join('')}
    </table>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA PERSONAJE*************
 // Route to show the PERSONAJE table
 app.get('/showPjTable', (req, res) => {

  // Execute the query
  connection.query('SELECT * FROM PERSONAJE INNER JOIN ESCENARIO ON PERSONAJE.id_escenario = ESCENARIO.id_escenario', function(err, results) {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      const creationDate = new Date(row.fecha_creacion).toLocaleDateString('en-GB');
      var endDate = new Date(row.fecha_finalizacion).toLocaleDateString('en-GB');
      if(endDate === '31/12/1969') endDate = '-';
      return `<tr>
        <td>${row.id_escenario}</td>
        <td >${row.jugable}</td>
        <td >${row.nombre_escenario}</td>
        <td style="max-width: 200px; overflow: auto; max-height: 50px;">${row.descripcion_escenario}</td>
        <td>${creationDate}</td>
        <td>${endDate}</td>
        <td>${row.grupoDesigner}</td>
        <td>${row.grupoDeveloper}</td>
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
    <h2>Data from PERSONAJE Table</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Playable</th>
        <th>Name</th>
        <th>Description</th>
        <th>Creation Date</th>
        <th>End Date</th>
        <th>Designer Group</th>
        <th>Developer Group</th>
      </tr>
      ${tableRows.join('')}
    </table>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA FEATURE*************
 // Route to show the FEATURE table
 app.get('/showFeatTable', (req, res) => {

  // Execute the query
  connection.query('SELECT * FROM FEATURE', function(err, results) {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      const creationDate = new Date(row.fecha_creacion).toLocaleDateString('en-GB');
      var updateDate = new Date(row.fechaAct).toLocaleDateString('en-GB');
      if(updateDate === '31/12/1969') updateDate = '-';
      return `<tr>
        <td>${row.id_feature}</td>
        <td >${row.nombre_feature}</td>
        <td style="max-width: 200px; overflow: auto; max-height: 50px;">${row.descripcion_feature}</td>
        <td >${row.version}</td>
        <td>${creationDate}</td>
        <td>${updateDate}</td>
        <td>${row.grupoDesigner}</td>
        <td>${row.grupoDeveloper}</td>
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
    <h2>Data from FEATURE Table</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Version</th>
        <th>Creation Date</th>
        <th>Last Update Date</th>
        <th>Designer Group</th>
        <th>Developer Group</th>
      </tr>
      ${tableRows.join('')}
    </table>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA SFX/MUSICA/SPRITE*************
 // Route to show the SFX/MUSICA/SPRITE table
 app.get('/showSmsTable', (req, res) => {

  // Execute the query
  connection.query('SELECT * FROM SPRITE_SFX_MUSICA INNER JOIN ARTE ON ARTE.id_arte = SPRITE_SFX_MUSICA.id_arte', function(err, results) {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      return `<tr>
        <td>${row.id_arte}</td>
        <td >${row.tipo}</td>
        <td >${row.nombre_arte}</td>
        <td >${row.direccion_NAS}</td>
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
    <h2>Data from SPRITE_SFX_MUSICA Table</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Tipo</th>
        <th>Name</th>
        <th>Address</th>
        <th>Artist Group</th>
      </tr>
      ${tableRows.join('')}
    </table>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});


//*************INSERTS*************
  // Serve the HTML form for inserting a SEDE
  app.get('/sedeInsertForm', (req, res) => {
    res.sendFile(__dirname + '\\views/sedeInsertForm.html'); // Provide the path to your sedeInsertForm.html file
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
        res.redirect('/sedeInsertForm')

    });
  });

    // Serve the HTML form for inserting a Developer
  app.get('/developerInsForm', (req, res) => {
    res.sendFile(__dirname + '\\views/developerInsForm.html'); // Provide the path to your sedeInsertForm.html file
  });
  
  // Handle the form submission for inserting a DEV
  app.post('/insertDeveloper', async (req, res) => {
    const { dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo } = req.body;
    connection.query("call crearDeveloper(?,?,?,?,?,?,?,?,?,?)", [dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo], function (err, result){
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
        res.redirect('/developerInsForm')

    });
  });

  // Serve the HTML form for inserting a bug
  app.get('/bugInsertForm', (req, res) => {
    res.sendFile(__dirname + '\\views/bugInsertForm.html'); // Provide the path to your bugInsertForm.html file
  });
  
  // Handle the form submission for inserting a bug
  app.post('/insertBug', async (req, res) => {
    var { titulo, descripcion, prioridad, nombreEvidencia, idFeature, idEscenario, userTester } = req.body;
    if (!idFeature) idFeature = null;
    if (!idEscenario) idEscenario = null;
    connection.query("call crearBug(?, ?, ?, ?, ?, ?, ?)", [titulo, descripcion, prioridad, nombreEvidencia, idFeature, idEscenario, userTester], function (err, result)
    {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
        res.redirect('/bugInsertForm')

    });
  });

  // Serve the HTML form for inserting an asset
  app.get('/assetInsertForm', (req, res) => {
    res.sendFile(__dirname + '\\views/assetInsertForm.html'); // Provide the path to your assetInsertForm.html file
  });
  
  // Handle the form submission for inserting a asset
  app.post('/insertAsset', async (req, res) => {
    var { id, nombre, descripcion, grupoDes, grupoDev } = req.body;

    connection.query("call crearAsset(?, ?, ?, ?, ?)", [id, nombre, descripcion, grupoDes, grupoDev], function (err, result)
    {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }

        res.redirect('/assetInsertForm')
    });
  });

    // Serve the HTML form for inserting a personaje
  app.get('/pjInsertForm', (req, res) => {
    res.sendFile(__dirname + '\\views/pjInsertForm.html'); // Provide the path to your pjInsertForm.html file
  });
  
  // Handle the form submission for inserting a pj
  app.post('/insertPj', async (req, res) => {
    var { id,  nombre, descripcion, jugable, grupoDes, grupoDev } = req.body;

    connection.query("call crearPersonaje(?, ?, ?, ?, ?, ?)", [id, nombre, descripcion, jugable, grupoDes, grupoDev], function (err, result)
    {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }

        res.redirect('/pjInsertForm')
    });
  });

    // Serve the HTML form for inserting a Feature
    app.get('/featInsertForm', (req, res) => {
      res.sendFile(__dirname + '\\views/featInsertForm.html'); // Provide the path to your featInsertForm.html file
    });
    
    // Handle the form submission for inserting a feat
    app.post('/insertFeat', async (req, res) => {
      var { id,  nombre, descripcion, version, fechaCreacion, grupoDes, grupoDev } = req.body;
  
      connection.query("call crearFeature(?, ?, ?, ?, ?, ?, ?)", [id,  nombre, descripcion, version, fechaCreacion, grupoDes, grupoDev], function (err, result)
      {
          if (err) {
              console.log("err:", err);
          } else {
              console.log("results:", result);
          }
  
          res.redirect('/featInsertForm')
      });
    });  

// Serve the HTML form for inserting a SFX/MUSICA/SPRITE
app.get('/smsInsertForm', (req, res) => {
  res.sendFile(__dirname + '\\views/smsInsertForm.html'); // Provide the path to your smsInsertForm.html file
});

// Handle the form submission for inserting a SFX/MUSICA/SPRITE
app.post('/insertSms', async (req, res) => {
  var { id, tipo, nombre, direccion, grupo } = req.body;
  if(tipo === 'Sprite') callArte = 'call crearSprite(?, ?, ?, ?)';
  else if(tipo === 'Musica') callArte = 'call crearMusica(?, ?, ?, ?)';
  else if(tipo === 'SFX') callArte = 'call crearSFX(?, ?, ?, ?)';
  else res.status(400).send('Ingresar un Tipo Correcto (Sprite, Musica o SFX)');
  connection.query(callArte, [id, nombre, direccion, grupo], function (err, result)
  {
      if (err) {
          console.log("err:", err);
      } else {
          console.log("results:", result);
      }

      res.redirect('/smsInsertForm')
  });
});    

//*************UPDATES*************
//SEDE

// Route to render the initial form to enter SEDE CUIT
app.get('/updateSede', (req, res) => {
    res.sendFile(__dirname + '\\views\\views/enterSedeCUITForm.html');
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

// Route to handle the updated data submission
app.post('/submitUpdatedSede', (req, res) => {
  const { cuit, nombre_sede, direccion, ciudad, provincia, pais, codigoPostal, alquiler, capacidad } = req.body;

  // SQL query to update the SEDE record
  const updateSedeQuery = `
    UPDATE SEDE
    SET
      nombre_sede = ?,
      direccion = ?,
      ciudad = ?,
      provincia = ?,
      pais = ?,
      codigoPostal = ?,
      alquiler = ?,
      capacidad = ?
    WHERE cuit = ?;
  `;

  // Execute the query with the form data
  connection.query(
    updateSedeQuery,
    [nombre_sede, direccion, ciudad, provincia, pais, codigoPostal, alquiler, capacidad, cuit],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error('Error updating SEDE:', updateErr);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send('SEDE not found for update');
        return;
      }

      res.send(`
      <h1>Success!</h1>
      <button onclick="location.href='/showSedeTable'">Back to Sede Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);
    }
  );
});

// BUG

// Route to render the initial form to enter BUG ID
app.get('/updateBug', (req, res) => {
  res.sendFile(__dirname + '\\views/enterBugIDForm.html');
});

// Route to handle the form submission and redirect to the update form
app.post('/enterBugID', (req, res) => {
  const { id_bug } = req.body;

  // Check if id_bug is provided
  if (!id_bug) {
    res.status(400).send('Bug ID is required');
    return;
  }

  // Redirect to the update form with the provided Bug ID
  res.redirect(`/updateThisBug/${id_bug}`);
});


// Route to render the update form with BUG data
app.get('/updateThisBug/:id_bug', (req, res) => {
  const id_bug = req.params.id_bug;

  // SQL query to check if the BUG with the given ID exists
  const checkBugQuery = `SELECT * FROM BUG WHERE id_bug = ${id_bug}`;

  connection.query(checkBugQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking BUG:', checkErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if the BUG with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send('BUG not found');
      return;
    }

    // Render the update form with BUG data
    res.render('updateBugForm', { bugData: checkResults[0] });
  });
});

// Route to handle the updated data submission
app.post('/submitUpdatedBug', (req, res) => {
  var { id_bug, titulo_bug, desc_bug, prioridad, archivo_evidencia, id_feature, id_escenario, tester_user } = req.body;
  if (!id_feature) id_feature = null;
  if (!id_escenario) id_escenario = null;  
  // SQL query to update the BUG record
  const updateBugQuery = `
    UPDATE BUG
    SET
      id_bug = ?,
      titulo_bug = ?,
      desc_bug = ?,
      prioridad = ?,
      archivo_evidencia = ?,
      id_feature = ?,
      id_escenario = ?,
      tester_user = ?
    WHERE id_bug = ?;
  `;

  // Execute the query with the form data
  connection.query(
    updateBugQuery,
    [id_bug, titulo_bug, desc_bug, prioridad, archivo_evidencia, id_feature, id_escenario, tester_user, id_bug],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error('Error updating BUG:', updateErr);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send('BUG not found for update');
        return;
      }

      res.send(`
      <h1>Success!</h1>
      <button onclick="location.href='/showBugTable'">Back to Bug Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);

    }
  );
});

// ASSET

// Route to render the initial form to enter Asset ID
app.get('/updateAsset', (req, res) => {
  res.sendFile(__dirname + '\\views/enterAssetIDForm.html');
});

// Route to handle the form submission and redirect to the update form
app.post('/enterAssetID', (req, res) => {
  const { id_asset } = req.body;

  // Check if id_asset is provided
  if (!id_asset) {
    res.status(400).send('Asset ID is required');
    return;
  }

  // Redirect to the update form with the provided Asset ID
  res.redirect(`/updateThisAsset/${id_asset}`);
});


// Route to render the update form with Asset data
app.get('/updateThisAsset/:id_asset', (req, res) => {
  const id_asset = req.params.id_asset;

  // SQL query to check if the Asset with the given ID exists
  const checkAssetQuery = `SELECT * FROM ASSET INNER JOIN ESCENARIO ON ASSET.id_escenario = ESCENARIO.id_escenario WHERE ASSET.id_escenario = ${'"' + id_asset + '"'}`;

  connection.query(checkAssetQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking ASSET:', checkErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if the ASSET with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send('ASSET not found');
      return;
    }

    // Render the update form with ASSET data
    res.render('updateAssetForm', { assetData: checkResults[0] });
  });
});

// Route to handle the updated data submission
app.post('/submitUpdatedAsset', (req, res) => {
  var { id, nombre, descripcion, grupoDes, grupoDev } = req.body;
  // SQL query to update the ASSET record
  const updateAssetQuery = `
    UPDATE ESCENARIO
    SET
      id_escenario = ?,
      nombre_escenario = ?,
      descripcion_escenario = ?,
      grupoDesigner = ?,
      grupoDeveloper = ?
    WHERE id_escenario = ?;
  `;

  // Execute the query with the form data
  connection.query(
    updateAssetQuery,
    [id, nombre, descripcion, grupoDes, grupoDev, id],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error('Error updating ASSET:', updateErr);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send('ASSET not found for update');
        return;
      }

      res.send(`
      <h1>Success!</h1>
      <button onclick="location.href='/showAssetTable'">Back to Asset Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);

    }
  );
});

// PERSONAJE

// Route to render the initial form to enter Personaje ID
app.get('/updatePj', (req, res) => {
  res.sendFile(__dirname + '\\views/enterPjIDForm.html');
});

// Route to handle the form submission and redirect to the update form
app.post('/enterPjID', (req, res) => {
  const { id_pj } = req.body;

  // Check if id_pj is provided
  if (!id_pj) {
    res.status(400).send('Personaje ID is required');
    return;
  }

  // Redirect to the update form with the provided Personaje ID
  res.redirect(`/updateThisPj/${id_pj}`);
});


// Route to render the update form with Personaje data
app.get('/updateThisPj/:id_pj', (req, res) => {
  const id_pj = req.params.id_pj;

  // SQL query to check if the Personaje with the given ID exists
  const checkPersonajeQuery = `SELECT * FROM PERSONAJE INNER JOIN ESCENARIO ON PERSONAJE.id_escenario = ESCENARIO.id_escenario WHERE PERSONAJE.id_escenario = ${'"' + id_pj + '"'}`;

  connection.query(checkPersonajeQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking Personaje:', checkErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if the PERSONAJE with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send('PERSONAJE not found');
      return;
    }

    // Render the update form with PERSONAJE data
    res.render('updatePjForm', { pjData: checkResults[0] });
  });
});

// Route to handle the updated data submission
app.post('/submitUpdatedPj', (req, res) => {
  var {id, nombre, descripcion, jugable, grupoDes, grupoDev } = req.body;
  // SQL query to update the PERSONAJE record
  const updatePjQuery = `
    UPDATE PERSONAJE
    SET
      jugable = ?
    WHERE id_escenario = ?;
  `;
  const updateEscQuery = `
  UPDATE ESCENARIO
  SET
    id_escenario = ?,
    nombre_escenario = ?,
    descripcion_escenario = ?,
    grupoDesigner = ?,
    grupoDeveloper = ?
  WHERE id_escenario = ?;
`;


  // Execute the query with the form data
  connection.query(
    updatePjQuery,
    [jugable, id],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error('Error updating PERSONAJE:', updateErr);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send('PERSONAJE not found for update');
        return;
      }

      connection.query(
        updateEscQuery,
        [id, nombre, descripcion, grupoDes, grupoDev, id],
        (updateErr, updateResults) => {
          if (updateErr) {
            console.error('Error updating PERSONAJE:', updateErr);
            res.status(500).send('Internal Server Error');
            return;
          }
    
          // Check if any record was updated
          if (updateResults.affectedRows === 0) {
            res.status(404).send('PERSONAJE not found for update');
            return;
          }
    
          res.send(`
          <h1>Success!</h1>
          <button onclick="location.href='/showPjTable'">Back to Personaje Table</button>
          <button onclick="location.href='/admin'">Back to Admin</button>
          `);
    
        });
    });
});

// FEATURE

// Route to render the initial form to enter Feature ID
app.get('/updateFeat', (req, res) => {
  res.sendFile(__dirname + '\\views/enterFeatIDForm.html');
});

// Route to handle the form submission and redirect to the update form
app.post('/enterFeatID', (req, res) => {
  const { id_feat } = req.body;

  // Check if id_feat is provided
  if (!id_feat) {
    res.status(400).send('Feature ID is required');
    return;
  }

  // Redirect to the update form with the provided Feature ID
  res.redirect(`/updateThisFeat/${id_feat}`);
});


// Route to render the update form with Feature data
app.get('/updateThisFeat/:id_feat', (req, res) => {
  const id_feat = req.params.id_feat;

  // SQL query to check if the Feature with the given ID exists
  const checkFeatQuery = `SELECT * FROM FEATURE WHERE id_feature = ${'"' + id_feat + '"'}`;

  connection.query(checkFeatQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking FEATURE:', checkErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if the FEATURE with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send('FEATURE not found');
      return;
    }

    checkResults[0].fecha_creacion = checkResults[0].fecha_creacion.toLocaleDateString('se-SE');
    // Render the update form with FEATURE data
    res.render('updateFeatForm', { featData: checkResults[0] });
  });
});

// Route to handle the updated data submission
app.post('/submitUpdatedFeat', (req, res) => {
  var { id, nombre, descripcion, version, fechaCreacion, grupoDes, grupoDev } = req.body;
  // SQL query to update the FEATURE record
  const updateFeatQuery = `
    UPDATE FEATURE
    SET
      id_feature = ?,
      nombre_feature = ?,
      descripcion_feature = ?,
      version = ?,
      fecha_creacion = ?,
      grupoDesigner = ?,
      grupoDeveloper = ?
    WHERE id_feature = ?;
  `;

  // Execute the query with the form data
  connection.query(
    updateFeatQuery,
    [id, nombre, descripcion, version, fechaCreacion, grupoDes, grupoDev, id],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error('Error updating FEATURE:', updateErr);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send('FEATURE not found for update');
        return;
      }

      res.send(`
      <h1>Success!</h1>
      <button onclick="location.href='/showFeatTable'">Back to Feature Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);

    }
  );
});

// SFX/MUSICA/SPRITE

// Route to render the initial form to enter SMS ID
app.get('/updateSms', (req, res) => {
  res.sendFile(__dirname + '\\views/enterSmsIDForm.html');
});

// Route to handle the form submission and redirect to the update form
app.post('/enterSmsID', (req, res) => {
  const { id_sms } = req.body;

  // Check if id_sms is provided
  if (!id_sms) {
    res.status(400).send('SFX/MUSICA/SPRITE ID is required');
    return;
  }

  // Redirect to the update form with the provided SMS ID
  res.redirect(`/updateThisSms/${id_sms}`);
});


// Route to render the update form with SMS data
app.get('/updateThisSms/:id_sms', (req, res) => {
  const id_sms = req.params.id_sms;

  // SQL query to check if the SMS with the given ID exists
  const checkSMSQuery = `SELECT * FROM SPRITE_SFX_MUSICA INNER JOIN ARTE ON ARTE.id_arte = SPRITE_SFX_MUSICA.id_arte WHERE SPRITE_SFX_MUSICA.id_arte = ${'"' + id_sms + '"'}`;

  connection.query(checkSMSQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking SFX/MUSICA/SPRITE:', checkErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if the SFX/MUSICA/SPRITE with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send('SFX/MUSICA/SPRITE not found');
      return;
    }

    // Render the update form with SFX/MUSICA/SPRITE data
    res.render('updateSmsForm', { smsData: checkResults[0] });
  });
});

// Route to handle the updated data submission
app.post('/submitUpdatedSms', (req, res) => {
  var {id, tipo, nombre, direccion, grupo } = req.body;
  // SQL query to update the PERSONAJE record
  const updateSmsQuery = `
    UPDATE SPRITE_SFX_MUSICA
    SET
      tipo = ?
    WHERE id_arte = ?;
  `;
  const updateArtQuery = `
  UPDATE ARTE
  SET
    id_arte = ?,
    nombre_arte = ?,
    direccion_NAS = ?,
    grupo = ?
  WHERE id_arte = ?;
`;

  // Execute the query with the form data
  connection.query(
    updateSmsQuery,
    [tipo, id],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error('Error updating SFX/MUSICA/SPRITE:', updateErr);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send('SFX/MUSICA/SPRITE not found for update');
        return;
      }

      connection.query(
        updateArtQuery,
        [id, nombre, direccion, grupo, id],
        (updateErr, updateResults) => {
          if (updateErr) {
            console.error('Error updating SFX/MUSICA/SPRITE:', updateErr);
            res.status(500).send('Internal Server Error');
            return;
          }
    
          // Check if any record was updated
          if (updateResults.affectedRows === 0) {
            res.status(404).send('SFX/MUSICA/SPRITE not found for update');
            return;
          }
    
          res.send(`
          <h1>Success!</h1>
          <button onclick="location.href='/showSmsTable'">Back to SFX/MUSICA/SPRITE Table</button>
          <button onclick="location.href='/admin'">Back to Admin</button>
          `);
    
        });
    });
});


//*************DELETES*************

// Route to render the form to enter BUG ID for deletion
app.get('/deleteBug', (req, res) => {
  res.send(`
    <h2>Delete BUG</h2>
    <form action="/deleteBug" method="post">
      <label for="id_bug">ID Bug:</label>
      <input type="text" name="id_bug" required><br>
      <button type="submit">Delete BUG</button>
    </form>
  `);
});

// Route to handle the form submission and delete the BUG
app.post('/deleteBug', (req, res) => {
  const idBug = req.body.id_bug;

  // SQL query to delete the BUG record
  const deleteBugQuery = 'DELETE FROM BUG WHERE id_bug = ?';

  // Execute the query with the provided ID Bug
  connection.query(deleteBugQuery, [idBug], (deleteErr, deleteResults) => {
    if (deleteErr) {
      console.error('Error deleting BUG:', deleteErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if any record was deleted
    if (deleteResults.affectedRows === 0) {
      res.status(404).send('BUG not found for deletion');
      return;
    }

    res.send(`
    <h1>Success!</h1>
    <button onclick="location.href='/showBugTable'">Back to Bug Table</button>
    <button onclick="location.href='/admin'">Back to Admin</button>
    `);
  });
});

// Route to render the form to enter EQUIPAMIENTO ID for deletion
app.get('/deleteEquipamiento', (req, res) => {
  res.send(`
    <h2>Delete EQUIPAMIENTO</h2>
    <form action="/deleteEquipamiento" method="post">
      <label for="id_equipamiento">ID Equipamiento:</label>
      <input type="text" name="id_equipamiento" required><br>
      <button type="submit">Delete EQUIPAMIENTO</button>
    </form>
  `);
});

// Route to handle the form submission and delete the EQUIPAMIENTO
app.post('/deleteEquipamiento', (req, res) => {
  const idEquipamiento = req.body.id_equipamiento;

  // SQL query to delete the EQUIPAMIENTO record
  const deleteEquipamientoQuery = 'DELETE FROM EQUIPAMIENTO WHERE id_equipamiento = ?';

  // Execute the query with the provided ID Equipamiento
  connection.query(deleteEquipamientoQuery, [idEquipamiento], (deleteErr, deleteResults) => {
    if (deleteErr) {
      console.error('Error deleting EQUIPAMIENTO:', deleteErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if any record was deleted
    if (deleteResults.affectedRows === 0) {
      res.status(404).send('EQUIPAMIENTO not found for deletion');
      return;
    }

    res.send(`
    <h1>Success!</h1>
    <button onclick="location.href='/showEquipamientoTable'">Back to Equipamiento Table</button>
    <button onclick="location.href='/admin'">Back to Admin</button>
    `);
  });
});

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  module.exports = app;