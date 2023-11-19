const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const router = express.Router();
const connection = require("../connectMySQL");

//*************CONSULTAS*************
router.get("/verArteEncargado", (req, res) => {
  const nombreEsc = req.query.nombreEsc;

  // Execute the stored procedure
  const query = "CALL verArteEncargado(?)";
  connection.query(query, [nombreEsc], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/verReporter", (req, res) => {
  const titulo = req.query.titulo;

  // Execute the stored procedure
  const query = "CALL verReporter(?)";
  connection.query(query, [titulo], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/verAnimadoresEncargados", (req, res) => {
  const nombreEsc = req.query.nombreEsc;

  // Execute the stored procedure
  const query = "CALL verAnimadoresEncargados(?)";
  connection.query(query, [nombreEsc], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/verMiembrosDesigners", (req, res) => {
  const nombreGrDes = req.query.nombreGrDes;

  // Execute the stored procedure
  const query = "CALL verMiembrosDesigners(?)";
  connection.query(query, [nombreGrDes], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/verBugsReportados", (req, res) => {
  const username = req.query.username;

  // Execute the stored procedure
  const query = "CALL verBugsReportados(?)";
  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/verOcupacionEmpleados", async (req, res) => {
  const query = "CALL verOcupacionEmpleados()";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/verPromedioResolucion", (req, res) => {
  const nombreGrDev = req.query.nombreGrDev;

  // Execute the stored procedure
  const query = "CALL verPromedioResolucion(?)";
  connection.query(query, [nombreGrDev], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/empleadosDeGrupo", (req, res) => {
  const nombre = req.query.nombre;

  // Execute the stored procedure
  const query = "CALL empleadosDeGrupo(?)";
  connection.query(query, [nombre], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/verBugsFeatEsc", (req, res) => {
  const id_fe = req.query.id_fe;

  // Execute the stored procedure
  const query = "CALL verBugsFeatEsc(?)";
  connection.query(query, [id_fe], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/verEscCompl", (req, res) => {
  const grupo_fe = req.query.grupo_fe;

  // Execute the stored procedure
  const query = "CALL verEscCompl(?)";
  connection.query(query, [grupo_fe], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get("/verPromedioFinalizacion", (req, res) => {
  const nombreGrDev = req.query.nombreGrDev;

  // Execute the stored procedure
  const query = "CALL verPromedioFinalizacion(?)";
  connection.query(query, [nombreGrDev], (err, results) => {
    if (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

// Serve the HTML form for linking an EQUIPAMIENTO TO a EMPLEADO
router.get("/linkEquipEmp", (req, res) => {
  res.sendFile(__dirname + "\\views/equipLinkForm.html"); // Provide the path to your equipLinkForm.html file
});

// Handle the form submission for inserting a SEDE
router.post("/linkEE", async (req, res) => {
  const {
    id_equip, usuario
  } = req.body;
  connection.query(
    "call anadirEquipEmp(?,?)",
    [
      id_equip, usuario
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/queries/linkEquipEmp");
    },
  );
});

// Serve the HTML form for linking an ESCENARIO TO an ARTE
router.get("/linkEscArt", (req, res) => {
  res.sendFile(__dirname + "\\views/escArtLinkForm.html"); // Provide the path to your escArtLinkForm.html file
});

// Handle the form submission for inserting a SEDE
router.post("/linkEA", async (req, res) => {
  const {
    idArte, idEscenario
  } = req.body;
  connection.query(
    "call unirEscenario_Arte(?,?)",
    [
      idArte, idEscenario
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/queries/linkEscArt");
    },
  );
});

router.get('/verAnimadoresEncargados', (req, res) => {
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

router.get('/verMiembrosDesigners', (req, res) => {
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

router.get('/verBugsReportados', (req, res) => {
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

router.get('/verOcupacionEmpleados', async (req, res) => {
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

router.get('/verPromedioResolucion', (req, res) => {
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

router.get('/empleadosDeGrupo', (req, res) => {
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

router.get('/verBugsFeatEsc', (req, res) => {
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

router.get('/verEscCompl', (req, res) => {
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

router.get('/verPromedioFinalizacion', (req, res) => {
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

router.get('/verLineasDeVoz', (req, res) => {
  const id_pj = req.query.id_pj;

  // Execute the stored procedure
  const query = 'CALL verLineasDeVoz(?)';
  connection.query(query, [id_pj], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get('/verAnimAsset', (req, res) => {
  const id_asset = req.query.id_asset;

  // Execute the stored procedure
  const query = 'CALL verAnimAsset(?)';
  connection.query(query, [id_asset], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});

router.get('/trabajosDe', (req, res) => {
  const usuario = req.query.usuario;

  // Execute the stored procedure
  const query = 'CALL trabajosDe(?)';
  connection.query(query, [usuario], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const data = results[0];
    res.json(data);
  });
});



router.get('/SASdeEscenario', (req, res) => {
  const nombre = req.query.nombre;

  // Execute the stored procedure
  const query = 'CALL SASdeEscenario(?)';
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

router.get('/verEquipDeSede', (req, res) => {
  const nombre = req.query.nombre;

  // Execute the stored procedure
  const query = 'CALL verEquipDeSede(?)';
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

router.get('/verEquipDeEmpleado', (req, res) => {
  const nombre = req.query.nombre;

  // Execute the stored procedure
  const query = 'CALL verEquipDeEmpleado(?)';
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

router.get('/actorDeVozDe', (req, res) => {
  const nombre = req.query.nombre;

  // Execute the stored procedure
  const query = 'CALL actorDeVozDe(?)';
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

router.get('/bugsAsignadosA', (req, res) => {
  const nombre = req.query.nombre;

  // Execute the stored procedure
  const query = 'CALL bugsAsignadosA(?)';
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

router.get('/verTrabajadoresDeFeature', (req, res) => {
  const nombre = req.query.nombre;

  // Execute the stored procedure
  const query = 'CALL verTrabajadoresDeFeature(?)';
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

router.get('/verTrabajadoresDeEscenario', (req, res) => {
  const nombre = req.query.nombre;

  // Execute the stored procedure
  const query = 'CALL verTrabajadoresDeEscenario(?)';
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

module.exports = router;
