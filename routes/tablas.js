const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const router = express.Router();
const connection = require("../connectMySQL");

//*************MOSTRAR TABLAS*************

//*************TABLA BUG*************
// Route to show the BUG table
router.get("/showBugTable", (req, res) => {
  // Query to select data from the BUG table

  // Execute the query
  connection.query("SELECT * FROM BUG", function (err, results) {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      const reportDate = new Date(row.fecha_reporte).toLocaleDateString(
        "en-GB",
      );
      var resolutionDate = new Date(row.fecha_solucion).toLocaleDateString(
        "en-GB",
      );
      if (resolutionDate === "31/12/1969") resolutionDate = "-";
      return `<tr>
          <td>${row.id_bug}</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${
            row.titulo_bug
          }</td>
          <td style="max-width: 200px; overflow: auto; max-height: 50px;">${
            row.desc_bug
          }</td>
          <td>${row.prioridad}</td>
          <td>${row.archivo_evidencia}</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${reportDate}</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${resolutionDate}</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${
            row.id_feature || "-"
          }</td>
          <td style="max-width: 100px; overflow: auto; max-height: 50px;">${
            row.id_escenario || "-"
          }</td>
          <td>${row.tester_user}</td>
        </tr>`;
    });

    const tableHtml = `<style>
        table {
          border-collapse: collapse;
          word-break: break-word;
          width: 100%;
          font-family: 'Trebuchet MS';
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
      </style>
      <h2 style="font-family: 'Trebuchet MS'">BUGS</h2>
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
        ${tableRows.join("")}
      </table><br/><br/>
      <button onclick="location.href='/consultas'">Volver</button>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA SEDE*************
// Route to show the SEDE table
router.get("/showSedeTable", (req, res) => {
  // Query to select data from the SEDE table
  const query = "SELECT * FROM SEDE";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).send("Internal Server Error");
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

    const tableHtml = `<style>
    table {
      border-collapse: collapse;
      word-break: break-word;
      width: 100%;
      font-family: 'Trebuchet MS'
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
  </style>
  <h2 style="font-family: 'Trebuchet MS'">SEDES</h2>
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
                            </tr>${tableRows.join("")}</table><br/><br/>
                            <button onclick="location.href='/consultas'">Volver</button>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA EQUIPAMIENTO*************
// Route to show the EQUIPAMIENTO table
router.get("/showEquipTable", (req, res) => {
  // Query to select data from the EQUIPAMIENTO table
  const query = "SELECT * FROM EQUIPAMIENTO";

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      return `<tr>
                  <td>${row.id_equipamiento}</td>
                  <td>${row.nombre_equipamiento}</td>
                  <td>${row.precio}</td>
                  <td>${row.SEDE_cuit}</td>
                  <td>${row.user}</td>
                </tr>`;
    });

    const tableHtml = `<style>
    table {
      border-collapse: collapse;
      word-break: break-word;
      width: 100%;
      font-family: 'Trebuchet MS'
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
  </style>
  <h2 style="font-family: 'Trebuchet MS'">EQUIPAMIENTO</h2>
                          <table border="1">
                            <tr>
                              <th>ID</th>
                              <th>Nombre Equipamiento</th>
                              <th>Precio</th>
                              <th>CUIT Sede</th>
                              <th>Asignado a</th>
                            </tr>${tableRows.join("")}</table><br/><br/>
                            <button onclick="location.href='/consultas'">Volver</button>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});


//*************TABLA DEVS+EMPLEADO*************
// Route to show the DEV table
router.get("/showDevTable", (req, res) => {
  // SQL query to join EMPLEADO and DEVELOPER tables on the 'user' column
  const query = `
      SELECT E.user, E.dni, E.nombre_empleado, E.apellido_empleado, E.fecha_nac, 
             E.ingreso_empresa, E.ingreso_proyecto, E.sueldo, E.rubro, E.seniority, D.grupo
      FROM EMPLEADO E
      JOIN DEVELOPER D ON E.user = D.user`;

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      const birthDate = new Date(row.fecha_nac).toLocaleDateString(
        "en-GB",
      );
      const enterDate = new Date(row.ingreso_empresa).toLocaleDateString(
        "en-GB",
      );
      const projDate = new Date(row.ingreso_proyecto).toLocaleDateString(
        "en-GB",
      );
      return `<tr>
            <td>${row.user}</td>
            <td>${row.dni}</td>
            <td>${row.nombre_empleado}</td>
            <td>${row.apellido_empleado}</td>
            <td>${birthDate}</td>
            <td>${enterDate}</td>
            <td>${projDate}</td>
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
                        font-family: 'Trebuchet MS'
                      }
                      th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                      }
                    </style>
                    <h2 style="font-family: 'Trebuchet MS'">DEVELOPER</h2>
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
                      </tr>${tableRows.join("")}</table><br/><br/>
                      <button onclick="location.href='/consultas'">Volver</button>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA DEsS+EMPLEADO*************
// Route to show the DES table
router.get("/showDesTable", (req, res) => {
  // SQL query to join EMPLEADO and DESIGNER tables on the 'user' column
  const query = `
      SELECT E.user, E.dni, E.nombre_empleado, E.apellido_empleado, E.fecha_nac, 
             E.ingreso_empresa, E.ingreso_proyecto, E.sueldo, E.rubro, E.seniority, D.grupo
      FROM EMPLEADO E
      JOIN DESIGNER D ON E.user = D.user`;

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      const birthDate = new Date(row.fecha_nac).toLocaleDateString(
        "en-GB",
      );
      const enterDate = new Date(row.ingreso_empresa).toLocaleDateString(
        "en-GB",
      );
      const projDate = new Date(row.ingreso_proyecto).toLocaleDateString(
        "en-GB",
      );
      return `<tr>
            <td>${row.user}</td>
            <td>${row.dni}</td>
            <td>${row.nombre_empleado}</td>
            <td>${row.apellido_empleado}</td>
            <td>${birthDate}</td>
            <td>${enterDate}</td>
            <td>${projDate}</td>
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
                        font-family: 'Trebuchet MS'
                      }
                      th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                      }
                    </style>
                    <h2 style="font-family: 'Trebuchet MS'">DESIGNER</h2>
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
                      </tr>${tableRows.join("")}</table><br/><br/>
                      <button onclick="location.href='/consultas'">Volver</button>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA TESTER+EMPLEADO*************
// Route to show the TESTER table
router.get("/showTestTable", (req, res) => {
  // SQL query to join EMPLEADO and TESTER tables on the 'user' column
  const query = `
      SELECT E.user, E.dni, E.nombre_empleado, E.apellido_empleado, E.fecha_nac, 
             E.ingreso_empresa, E.ingreso_proyecto, E.sueldo, E.rubro, E.seniority
      FROM EMPLEADO E
      JOIN TESTER D ON E.user = D.user`;

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      const birthDate = new Date(row.fecha_nac).toLocaleDateString(
        "en-GB",
      );
      const enterDate = new Date(row.ingreso_empresa).toLocaleDateString(
        "en-GB",
      );
      const projDate = new Date(row.ingreso_proyecto).toLocaleDateString(
        "en-GB",
      );
      return `<tr>
            <td>${row.user}</td>
            <td>${row.dni}</td>
            <td>${row.nombre_empleado}</td>
            <td>${row.apellido_empleado}</td>
            <td>${birthDate}</td>
            <td>${enterDate}</td>
            <td>${projDate}</td>
            <td>${row.sueldo}</td>
            <td>${row.rubro}</td>
            <td>${row.seniority}</td>
          </tr>`;
    });

    const tableHtml = `<style>
                      table {
                        border-collapse: collapse;
                        word-break: break-word;
                        width: 100%;
                        font-family: 'Trebuchet MS'
                      }
                      th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                      }
                    </style>
                    <h2 style="font-family: 'Trebuchet MS'">TESTER</h2>
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
                      </tr>${tableRows.join("")}</table><br/><br/>
                      <button onclick="location.href='/consultas'">Volver</button>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA ARTISTA+EMPLEADO*************
// Route to show the ARTISTA table
router.get("/showArtTable", (req, res) => {
  // SQL query to join EMPLEADO and ARTISTA tables on the 'user' column
  const query = `
      SELECT E.user, E.dni, E.nombre_empleado, E.apellido_empleado, E.fecha_nac, 
             E.ingreso_empresa, E.ingreso_proyecto, E.sueldo, E.rubro, E.seniority, D.grupo
      FROM EMPLEADO E
      JOIN ARTISTA D ON E.user = D.user`;

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      const birthDate = new Date(row.fecha_nac).toLocaleDateString(
        "en-GB",
      );
      const enterDate = new Date(row.ingreso_empresa).toLocaleDateString(
        "en-GB",
      );
      const projDate = new Date(row.ingreso_proyecto).toLocaleDateString(
        "en-GB",
      );
      return `<tr>
            <td>${row.user}</td>
            <td>${row.dni}</td>
            <td>${row.nombre_empleado}</td>
            <td>${row.apellido_empleado}</td>
            <td>${birthDate}</td>
            <td>${enterDate}</td>
            <td>${projDate}</td>
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
                        font-family: 'Trebuchet MS'
                      }
                      th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                      }
                    </style>
                    <h2 style="font-family: 'Trebuchet MS'">ARTISTA</h2>
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
                      </tr>${tableRows.join("")}</table><br/><br/>
                      <button onclick="location.href='/consultas'">Volver</button>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA ASSET*************
// Route to show the ASSET table
router.get("/showAssetTable", (req, res) => {
  // Execute the query
  connection.query(
    "SELECT * FROM ASSET INNER JOIN ESCENARIO ON ASSET.id_escenario = ESCENARIO.id_escenario",
    function (err, results) {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Render the data in an HTML table
      const tableRows = results.map((row) => {
        const creationDate = new Date(row.fecha_creacion).toLocaleDateString(
          "en-GB",
        );
        var endDate = new Date(row.fecha_finalizacion).toLocaleDateString(
          "en-GB",
        );
        if (endDate === "31/12/1969") endDate = "-";
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
        font-family: 'Trebuchet MS'
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
    </style>
    <h2 style="font-family: 'Trebuchet MS'">ASSETS</h2>
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
      ${tableRows.join("")}
    </table><br/><br/>
    <button onclick="location.href='/consultas'">Volver</button>`;

      // Send the HTML response with the table
      res.send(tableHtml);
    },
  );
});

//*************TABLA PERSONAJE*************
// Route to show the PERSONAJE table
router.get("/showPjTable", (req, res) => {
  // Execute the query
  connection.query(
    "SELECT * FROM PERSONAJE INNER JOIN ESCENARIO ON PERSONAJE.id_escenario = ESCENARIO.id_escenario",
    function (err, results) {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Render the data in an HTML table
      const tableRows = results.map((row) => {
        const creationDate = new Date(row.fecha_creacion).toLocaleDateString(
          "en-GB",
        );
        var endDate = new Date(row.fecha_finalizacion).toLocaleDateString(
          "en-GB",
        );
        if (endDate === "31/12/1969") endDate = "-";
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
        font-family: 'Trebuchet MS'
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
    </style>
    <h2 style="font-family: 'Trebuchet MS'">PERSONAJE</h2>
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
      ${tableRows.join("")}
    </table><br/><br/>
    <button onclick="location.href='/consultas'">Volver</button>`;

      // Send the HTML response with the table
      res.send(tableHtml);
    },
  );
});

//*************TABLA FEATURE*************
// Route to show the FEATURE table
router.get("/showFeatTable", (req, res) => {
  // Execute the query
  connection.query("SELECT * FROM FEATURE", function (err, results) {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the data in an HTML table
    const tableRows = results.map((row) => {
      const creationDate = new Date(row.fecha_creacion).toLocaleDateString(
        "en-GB",
      );
      var updateDate = new Date(row.fechaAct).toLocaleDateString("en-GB");
      if (updateDate === "31/12/1969") updateDate = "-";
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
        font-family: 'Trebuchet MS'
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
    </style>
    <h2 style="font-family: 'Trebuchet MS'">FEATURES</h2>
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
      ${tableRows.join("")}
    </table><br/><br/>
    <button onclick="location.href='/consultas'">Volver</button>`;

    // Send the HTML response with the table
    res.send(tableHtml);
  });
});

//*************TABLA SFX/MUSICA/SPRITE*************
// Route to show the SFX/MUSICA/SPRITE table
router.get("/showSmsTable", (req, res) => {
  // Execute the query
  connection.query(
    "SELECT * FROM SPRITE_SFX_MUSICA INNER JOIN ARTE ON ARTE.id_arte = SPRITE_SFX_MUSICA.id_arte",
    function (err, results) {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).send("Internal Server Error");
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
        font-family: 'Trebuchet MS'
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
    </style>
    <h2 style="font-family: 'Trebuchet MS'">SPRITE/SFX/MUSICA</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Tipo</th>
        <th>Name</th>
        <th>Address</th>
        <th>Artist Group</th>
      </tr>
      ${tableRows.join("")}
    </table><br/><br/>
    <button onclick="location.href='/consultas'">Volver</button>`;

      // Send the HTML response with the table
      res.send(tableHtml);
    },
  );
});

//*************TABLA ANIMACION*************
// Route to show the ANIMACION table
router.get("/showAnimTable", (req, res) => {
  // Execute the query
  connection.query(
    "SELECT * FROM ANIMACION INNER JOIN ARTE ON ARTE.id_arte = ANIMACION.id_arte",
    function (err, results) {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Render the data in an HTML table
      const tableRows = results.map((row) => {
        return `<tr>
        <td>${row.id_arte}</td>
        <td >${row.nombre_arte}</td>
        <td >${row.direccion_NAS}</td>
        <td>${row.grupo}</td>
        <td >${row.id_escenario}</td>
      </tr>`;
      });

      const tableHtml = `<style>
      table {
        border-collapse: collapse;
        word-break: break-word;
        width: 100%;
        font-family: 'Trebuchet MS'
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
    </style>
    <h2 style="font-family: 'Trebuchet MS'">ANIMACION</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Address</th>
        <th>Artist Group</th>
        <th>ID Asset</th>
      </tr>
      ${tableRows.join("")}
    </table><br/><br/>
    <button onclick="location.href='/consultas'">Volver</button>`;

      // Send the HTML response with the table
      res.send(tableHtml);
    },
  );
});


//*************TABLA LINEA_VOZ*************
// Route to show the LINEA_VOZ table
router.get("/showVlTable", (req, res) => {
  // Execute the query
  connection.query(
    "SELECT * FROM LINEA_VOZ INNER JOIN ARTE ON ARTE.id_arte = LINEA_VOZ.id_arte",
    function (err, results) {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Render the data in an HTML table
      const tableRows = results.map((row) => {
        return `<tr>
        <td>${row.id_arte}</td>
        <td >${row.nombre_arte}</td>
        <td >${row.direccion_NAS}</td>
        <td >${row.id_escenario}</td>
        <td>${row.grupo}</td>
        <td >${row.user}</td>
        <td style="max-width: 150px; overflow: auto; max-height: 50px;">${row.txt_sp}</td>
        <td style="max-width: 150px; overflow: auto; max-height: 50px;">${row.txt_eng}</td>
      </tr>`;
      });

      const tableHtml = `<style>
      table {
        border-collapse: collapse;
        word-break: break-word;
        width: 100%;
        font-family: 'Trebuchet MS'
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
    </style>
    <h2 style="font-family: 'Trebuchet MS'">LINEAS DE VOZ</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Address</th>
        <th>Character ID</th>
        <th>Artist Group</th>
        <th>Voice Actor</th>
        <th>Spanish Text</th>
        <th>English Text</th>
      </tr>
      ${tableRows.join("")}
    </table><br/><br/>
    <button onclick="location.href='/consultas'">Volver</button>`;

      // Send the HTML response with the table
      res.send(tableHtml);
    },
  );
});

//*************TABLA LINK*************
// Route to show the LINK table
router.get("/showLinkTable", (req, res) => {
  // Execute the query
  connection.query(
    "SELECT * FROM ESCENARIO_has_SPRITE_SFX_MUSICA",
    function (err, results) {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Render the data in an HTML table
      const tableRows = results.map((row) => {
        return `<tr>
        <td>${row.id_arte}</td>
        <td >${row.id_escenario}</td>
      </tr>`;
      });

      const tableHtml = `<style>
      table {
        border-collapse: collapse;
        word-break: break-word;
        width: 100%;
        font-family: 'Trebuchet MS'
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
    </style>
    <h2 style="font-family: 'Trebuchet MS'">ESCENARIO - SPRITE/SFX/MUSICA</h2>
    <table>
      <tr>
        <th>ID Arte</th>
        <th>ID Escenario</th>
      </tr>
      ${tableRows.join("")}
    </table><br/><br/>
    <button onclick="location.href='/consultas'">Volver</button>`;

      // Send the HTML response with the table
      res.send(tableHtml);
    },
  );
});

//*************TABLA GRUPOS*************
// Route to show the GRUPOS table
router.get("/showGrTable", (req, res) => {
  // Execute the query
  connection.query(
    "SELECT nombre_grupo, 'Developers' AS table_name FROM grupo_developer UNION SELECT nombre_grupo, 'Designers' AS table_name FROM grupo_designer UNION SELECT nombre_grupo, 'Artistas' AS table_name FROM grupo_artista;",
    function (err, results) {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Render the data in an HTML table
      const tableRows = results.map((row) => {
        return `<tr>
        <td>${row.nombre_grupo}</td>
        <td >${row.table_name}</td>
      </tr>`;
      });

      const tableHtml = `<style>
      table {
        border-collapse: collapse;
        word-break: break-word;
        width: 100%;
        font-family: 'Trebuchet MS'
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
    </style>
    <h2 style="font-family: 'Trebuchet MS'">GRUPOS</h2>
    <table>
      <tr>
        <th>Nombre Grupo</th>
        <th>Tipo Grupo</th>
      </tr>
      ${tableRows.join("")}
    </table><br/><br/>
    <button onclick="location.href='/consultas'">Volver</button>`;

      // Send the HTML response with the table
      res.send(tableHtml);
    },
  );
});

module.exports = router;
