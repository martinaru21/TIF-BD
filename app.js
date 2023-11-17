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





//*************INSERTS*************
  // Serve the HTML form for inserting a SEDE
  app.get('/sedeInsertForm', (req, res) => {
    res.sendFile(__dirname + '\\views\\views/sedeInsertForm.html'); // Provide the path to your sedeInsertForm.html file
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

    // Serve the HTML form for inserting a Developer
  app.get('/developerInsForm', (req, res) => {
    res.sendFile(__dirname + '\\views/developerInsForm.html'); // Provide the path to your sedeInsertForm.html file
  });
  
  // Handle the form submission for inserting a SEDE
  app.post('/insertDeveloper', async (req, res) => {
    const { dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo } = req.body;
    connection.query("call crearDeveloper(?,?,?,?,?,?,?,?,?,?)", [dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo], function (err, result){
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
        res.send('SEDE updated successfully!');

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

      res.send('SEDE updated successfully!');
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

      res.redirect('/admin');

    }
  );
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

    res.redirect('/admin');
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

    res.send('EQUIPAMIENTO deleted successfully!');
  });
});

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  module.exports = app;