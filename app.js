const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configuracion de la conexion al server de MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2002',
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
    // Read the contents of the HTML file
    const filePath = path.join(__dirname + '\\views/searchAndButtons.html');
    
    fs.readFile('views\\consultasView.html', 'utf8', (err, htmlContent) => {
      if (err) {
        console.error('Error reading HTML file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Send the combined HTML content as the response
      res.send(htmlContent);
    });
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
      <button onclick="location.href='/grupoDeveloperMenu'">Grupos de Developers</button>
      <button onclick="location.href='/grupoDesignerMenu'">Grupos de Designers</button>
      <button onclick="location.href='/grupoArtistaMenu'">Grupos de Artistas</button>
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
          <button onclick="location.href='/bugInsertForm'">Borrar</button>
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
      <button onclick="location.href='/empleadoModForm'">Modificar</button>
    `);
  });

//*************MENU DESIGNERS*************
  app.get('/designerMenu', (req, res) => {
    res.send(`
      <h1>Administrador: Designers</h1>
      <button onclick="location.href='/designerInsForm'">Nuevo</button>
      <button onclick="location.href='/empleadoModForm'">Modificar</button>
    `);
  });

//*************MENU ARTISTAS*************
app.get('/artistaMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Artistas</h1>
    <button onclick="location.href='/artistaInsForm'">Nuevo</button>
    <button onclick="location.href='/empleadoModForm'">Modificar</button>
  `);
});

//*************MENU TESTERS*************
app.get('/testerMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Tester</h1>
    <button onclick="location.href='/testerInsForm'">Nuevo</button>
    <button onclick="location.href='/empleadoModForm'">Modificar</button>
  `);
});

//*************MENU GRUPO DEVELOPERS*************
app.get('/grupoDeveloperMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Grupos de Developers</h1>
    <button onclick="location.href='/grupoDevInsForm'">Nuevo</button>
  `);
});

//*************MENU GRUPO DESIGNERS*************
app.get('/grupoDesignerMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Grupos de Designers</h1>
    <button onclick="location.href='/grupoDesInsForm'">Nuevo</button>
  `);
});

//*************MENU GRUPO ARTISTAS*************
app.get('/grupoArtistaMenu', (req, res) => {
res.send(`
  <h1>Administrador: Grupos de Artistas</h1>
  <button onclick="location.href='/grupoArtInsForm'">Nuevo</button>
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
    });
  });

    // Insertar DEVELOPER
  app.get('/developerInsForm', (req, res) => {
    res.sendFile(__dirname + '\\views/developerInsForm.html'); // Provide the path to your sedeInsertForm.html file
  });
  
  // Handle the form submission for inserting a DEVELOPER
  app.post('/insertDeveloper', async (req, res) => {
    const { dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo } = req.body;
    connection.query("call crearDeveloper(?,?,?,?,?,?,?,?,?,?)", [dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo], function (err, result){
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
        res.send('Developer creado con exito!');

    });
  });


    // Insertar ARTISTAS
      app.get('/artistaInsForm', (req, res) => {
        res.sendFile(__dirname + '\\views/artistaInsForm.html'); // Provide the path to your sedeInsertForm.html file
      });
      
      // Handle the form submission for inserting a ARTISTA
      app.post('/insertArtista', async (req, res) => {
        const { dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo } = req.body;
        connection.query("call crearArtista(?,?,?,?,?,?,?,?,?,?)", [dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo], function (err, result){
            if (err) {
                console.log("err:", err);
            } else {
                console.log("results:", result);
            }
            res.send('Artista creado con exito!');
    
        });
      });


      // Insertar TESTER
     app.get('/testerInsForm', (req, res) => {
      res.sendFile(__dirname + '\\views/testerInsForm.html'); // Provide the path to your sedeInsertForm.html file
    });
    
    // Handle the form submission for inserting a DESIGNER
    app.post('/insertTester', async (req, res) => {
      const { dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority } = req.body;
      connection.query("call crearTester(?,?,?,?,?,?,?,?,?)", [dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority], function (err, result){
          if (err) {
              console.log("err:", err);
          } else {
              console.log("results:", result);
          }
          res.send('Tester creado con exito!');
  
      });
    });


     // Insertar DESIGNERS
     app.get('/designerInsForm', (req, res) => {
      res.sendFile(__dirname + '\\views/designerInsForm.html'); // Provide the path to your sedeInsertForm.html file
    });
    
    // Handle the form submission for inserting a DESIGNER
    app.post('/insertDesigner', async (req, res) => {
      const { dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo } = req.body;
      connection.query("call crearDesigner(?,?,?,?,?,?,?,?,?,?)", [dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo], function (err, result){
          if (err) {
              console.log("err:", err);
          } else {
              console.log("results:", result);
          }
          res.send('Designer creado con exito!');
  
      });
    });


    // Insertar GRUPO DE ARTISTAS
    app.get('/grupoArtInsForm', (req, res) => {
      res.sendFile(__dirname + '\\views/grupoArtInsForm.html'); // Provide the path to your sedeInsertForm.html file
    });
    
    // Handle the form submission for inserting a GRUPO DE ARTISTAS
    app.post('/insertGrupoArtista', async (req, res) => {
      const { nombre } = req.body;
      connection.query("call crearGrupoArtista(?)", [nombre], function (err, result){
          if (err) {
              console.log("err:", err);
          } else {
              console.log("results:", result);
          }
          res.send('Grupo de Artistas creado con exito!');
  
      });
    });


    // Insertar GRUPO DE DEVELOPERS
app.get('/grupoDevInsForm', (req, res) => {
  res.sendFile(__dirname + '\\views/grupoDevInsForm.html'); // Provide the path to your sedeInsertForm.html file
});




// Insertar GRUPO DE DEVELOPERS
app.get('/grupoDesInsForm', (req, res) => {
  res.sendFile(__dirname + '\\views/grupoDesInsForm.html'); // Provide the path to your sedeInsertForm.html file
});

// Handle the form submission for inserting a GRUPO DE DesignerS
app.post('/insertGrupoDesigner', async (req, res) => {
  const { nombre } = req.body;
  connection.query("call crearGrupoDesigner(?)", [nombre], function (err, result){
      if (err) {
          console.log("err:", err);
      } else {
          console.log("results:", result);
      }
      res.send('Grupo de Designers creado con exito!');

  });
});



// Handle the form submission for inserting a GRUPO DE DEVELOPERS
app.post('/insertGrupoDeveloper', async (req, res) => {
  const { nombre } = req.body;
  connection.query("call crearGrupoDeveloper(?)", [nombre], function (err, result){
      if (err) {
          console.log("err:", err);
      } else {
          console.log("results:", result);
      }
      res.send('Grupo de Developers creado con exito!');

  });
});


//*************UPDATES*************
// Route to render the initial form to enter SEDE CUIT
app.get('/updateSede', (req, res) => {
    res.sendFile(__dirname + '\\views/enterSedeCUITForm.html');
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
  app.get('/verArteEncargado', (req, res) => {
    const nombreEsc = req.query.nombreEsc;
  
    // Execute the stored procedure
    const query = 'CALL verArteEncargado(?)';
    connection.query(query, [nombreEsc], (err, results) => {
      if (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Send the data as JSON
      res.json(results[0]);  // Assuming results is an array of objects
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

  
// Modificar EMPLEADO
app.get('/empleadoModForm', (req, res) => {
  res.sendFile(__dirname + '\\views/enterUserEmpForm.html');
});

// Route to handle the form submission and redirect to the update form
app.post('/enterUserEmp', (req, res) => {
  const { user } = req.body;

  // Verifica si se hay usuario
  if (!user) {
    res.status(400).send('Se necesita un Usuario');
    return;
  }

  // Redirect to the update form with the provided Usuario
  res.redirect(`/updateThisEmpleado/${user}`);
});

//*************DELETES*************

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
  




//*************CONSULTAS*************
app.get('/verArteEncargado', (req, res) => {
    const nombreEsc = req.query.nombreEsc;
  
    // Execute the stored procedure
    const query = 'CALL verArteEncargado(?)';
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

app.get('/verReporter', (req, res) => {
  const titulo = req.query.titulo;

  // Execute the stored procedure
  const query = 'CALL verReporter(?)';
  connection.query(query, [titulo], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

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


  // Route to render the update form with EMPLEADO data
  app.get('/updateThisEmpleado/:user', (req, res) => {
    const user = req.params.user;
  
    // SQL query to check if the EMPLEADO with the given USER exists
    const checkEmpleadoQuery = `SELECT * FROM EMPLEADO WHERE user = '${user}'`;
  
    connection.query(checkEmpleadoQuery, (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error chequeando al Empleado:', checkErr);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Check if the EMPLEADO with the given USER exists
      if (checkResults.length === 0) {
        res.status(404).send('No se encontro al Empleado');
        return;
      }
      checkResults[0].fecha_nac = checkResults[0].fecha_nac.toLocaleDateString('se-SE');
      checkResults[0].ingreso_empresa = checkResults[0].ingreso_empresa.toLocaleDateString('se-SE');
      checkResults[0].ingreso_proyecto = checkResults[0].ingreso_proyecto.toLocaleDateString('se-SE');

      // Render the update form with EMPLEADO data
      res.render('updateEmpleadoForm', { empleadoData: checkResults[0] });
    });
  });

  // Route to handle the updated data submission
  app.post('/submitUpdatedEmpleado', (req, res) => {
    const { dni, nombre_empleado, apellido_empleado, fecha_nac, ingreso_empresa, ingreso_proyecto, sueldo, rubro, seniority, user} = req.body;
  
    // SQL query to update the EMPLEADO record
    const updateEmpleadoQuery = `
      UPDATE EMPLEADO
      SET
      dni = ?,
      nombre_empleado = ?,
      apellido_empleado = ?,
      fecha_nac = ?,
      ingreso_empresa = ?,
      ingreso_proyecto = ?,
      sueldo = ?,
      rubro = ?,
      seniority = ?,
      user = ?
      WHERE user = ?;
    `;
  
    // Execute the query with the form data
    connection.query(
      updateEmpleadoQuery,
      [dni, nombre_empleado, apellido_empleado, fecha_nac, ingreso_empresa, ingreso_proyecto, sueldo, rubro, seniority, user, user],
      (updateErr, updateResults) => {
        if (updateErr) {
          console.error('Error actualizando Empleado:', updateErr);
          res.status(500).send('Internal Server Error');
          return;
        }
  
        // Check if any record was updated
        if (updateResults.affectedRows === 0) {
          res.status(404).send('No se encontro Empleado para actualizar');
          return;
        }
  
        res.send('Empleado modificado exitosamente!!!');
      }
    );
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
