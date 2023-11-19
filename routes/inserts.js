const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const router = express.Router();
const connection = require("../connectMySQL");

//*************INSERTS*************
// Serve the HTML form for inserting a SEDE
router.get("/sedeInsertForm", (req, res) => {
  res.sendFile(__dirname + "\\views/sedeInsertForm.html"); // Provide the path to your sedeInsertForm.html file
});

// Handle the form submission for inserting a SEDE
router.post("/insertSede", async (req, res) => {
  const {
    cuit,
    nombre_sede,
    direccion,
    ciudad,
    provincia,
    pais,
    codigoPostal,
    alquiler,
    capacidad,
  } = req.body;
  connection.query(
    "call crearSede(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      cuit,
      nombre_sede,
      direccion,
      ciudad,
      provincia,
      pais,
      codigoPostal,
      alquiler,
      capacidad,
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/sedeInsertForm");
    },
  );
});

// Serve the HTML form for inserting a EQUIPAMIENTO
router.get("/equipInsertForm", (req, res) => {
  res.sendFile(__dirname + "\\views/equipInsertForm.html"); // Provide the path to your equipInsertForm.html file
});

// Handle the form submission for inserting a SEDE
router.post("/insertEquip", async (req, res) => {
  const {
    id_equip, nombre_equip, precio, cuit_sede
  } = req.body;
  connection.query(
    "call crearEquipamiento(?, ?, ?, ?)",
    [
      id_equip, nombre_equip, precio, cuit_sede
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/equipInsertForm");
    },
  );
});


// Serve the HTML form for inserting a Developer
router.get("/developerInsForm", (req, res) => {
  res.sendFile(__dirname + "\\views/developerInsForm.html"); // Provide the path to your sedeInsertForm.html file
});

// Handle the form submission for inserting a DEV
router.post("/insertDeveloper", async (req, res) => {
  const {
    dni,
    nombre,
    apellido,
    fecha_nac,
    ing_emp,
    ing_proy,
    sueldo,
    rubro,
    seniority,
    grupo,
  } = req.body;
  connection.query(
    "call crearDeveloper(?,?,?,?,?,?,?,?,?,?)",
    [
      dni,
      nombre,
      apellido,
      fecha_nac,
      ing_emp,
      ing_proy,
      sueldo,
      rubro,
      seniority,
      grupo,
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/developerInsForm");
    },
  );
});

// Insertar ARTISTAS
router.get("/artistaInsForm", (req, res) => {
  res.sendFile(__dirname + "\\views/artistaInsForm.html"); // Provide the path to your sedeInsertForm.html file
});

// Handle the form submission for inserting a ARTISTA
router.post("/insertArtista", async (req, res) => {
  const {
    dni,
    nombre,
    apellido,
    fecha_nac,
    ing_emp,
    ing_proy,
    sueldo,
    rubro,
    seniority,
    grupo,
  } = req.body;
  connection.query(
    "call crearArtista(?,?,?,?,?,?,?,?,?,?)",
    [
      dni,
      nombre,
      apellido,
      fecha_nac,
      ing_emp,
      ing_proy,
      sueldo,
      rubro,
      seniority,
      grupo,
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/artistaInsForm");
    },
  );
});

// Insertar TESTER
router.get("/testerInsForm", (req, res) => {
  res.sendFile(__dirname + "\\views/testerInsForm.html"); // Provide the path to your sedeInsertForm.html file
});

// Handle the form submission for inserting a DESIGNER
router.post("/insertTester", async (req, res) => {
  const {
    dni,
    nombre,
    apellido,
    fecha_nac,
    ing_emp,
    ing_proy,
    sueldo,
    rubro,
    seniority,
  } = req.body;
  connection.query(
    "call crearTester(?,?,?,?,?,?,?,?,?)",
    [
      dni,
      nombre,
      apellido,
      fecha_nac,
      ing_emp,
      ing_proy,
      sueldo,
      rubro,
      seniority,
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/testerInsForm");
    },
  );
});

// Insertar DESIGNERS
router.get("/designerInsForm", (req, res) => {
  res.sendFile(__dirname + "\\views/designerInsForm.html"); // Provide the path to your sedeInsertForm.html file
});

// Handle the form submission for inserting a DESIGNER
router.post("/insertDesigner", async (req, res) => {
  const {
    dni,
    nombre,
    apellido,
    fecha_nac,
    ing_emp,
    ing_proy,
    sueldo,
    rubro,
    seniority,
    grupo,
  } = req.body;
  connection.query(
    "call crearDesigner(?,?,?,?,?,?,?,?,?,?)",
    [
      dni,
      nombre,
      apellido,
      fecha_nac,
      ing_emp,
      ing_proy,
      sueldo,
      rubro,
      seniority,
      grupo,
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/designerInsForm");
    },
  );
});

// Insertar GRUPO DE ARTISTAS
router.get("/grupoArtInsForm", (req, res) => {
  res.sendFile(__dirname + "\\views/grupoArtInsForm.html"); // Provide the path to your sedeInsertForm.html file
});

// Handle the form submission for inserting a GRUPO DE ARTISTAS
router.post("/insertGrupoArtista", async (req, res) => {
  const { nombre } = req.body;
  connection.query(
    "call crearGrupoArtista(?)",
    [nombre],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/grupoArtInsForm");
    },
  );
});

// Insertar GRUPO DE DEVELOPERS
router.get("/grupoDevInsForm", (req, res) => {
  res.sendFile(__dirname + "\\views/grupoDevInsForm.html"); // Provide the path to your sedeInsertForm.html file
});

// Handle the form submission for inserting a GRUPO DE DEVELOPERS
router.post("/insertGrupoDeveloper", async (req, res) => {
  const { nombre } = req.body;
  connection.query(
    "call crearGrupoDeveloper(?)",
    [nombre],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/grupoDevInsForm");
    },
  );
});

// Insertar GRUPO DE DESIGNERS
router.get("/grupoDesInsForm", (req, res) => {
  res.sendFile(__dirname + "\\views/grupoDesInsForm.html"); // Provide the path to your sedeInsertForm.html file
});

// Handle the form submission for inserting a GRUPO DE DesignerS
router.post("/insertGrupoDesigner", async (req, res) => {
  const { nombre } = req.body;
  connection.query(
    "call crearGrupoDesigner(?)",
    [nombre],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/grupoDesInsForm");
    },
  );
});

// Serve the HTML form for inserting a bug
router.get("/bugInsertForm", (req, res) => {
  res.sendFile(__dirname + "\\views/bugInsertForm.html"); // Provide the path to your bugInsertForm.html file
});

// Handle the form submission for inserting a bug
router.post("/insertBug", async (req, res) => {
  var {
    titulo,
    descripcion,
    prioridad,
    nombreEvidencia,
    idFeature,
    idEscenario,
    userTester,
  } = req.body;
  if (!idFeature) idFeature = null;
  if (!idEscenario) idEscenario = null;
  connection.query(
    "call crearBug(?, ?, ?, ?, ?, ?, ?)",
    [
      titulo,
      descripcion,
      prioridad,
      nombreEvidencia,
      idFeature,
      idEscenario,
      userTester,
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
      res.redirect("/inserts/bugInsertForm");
    },
  );
});

// Serve the HTML form for inserting an asset
router.get("/assetInsertForm", (req, res) => {
  res.sendFile(__dirname + "\\views/assetInsertForm.html"); // Provide the path to your assetInsertForm.html file
});

// Handle the form submission for inserting a asset
router.post("/insertAsset", async (req, res) => {
  var { id, nombre, descripcion, grupoDes, grupoDev } = req.body;

  connection.query(
    "call crearAsset(?, ?, ?, ?, ?)",
    [id, nombre, descripcion, grupoDes, grupoDev],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }

      res.redirect("/inserts/assetInsertForm");
    },
  );
});

// Serve the HTML form for inserting a personaje
router.get("/pjInsertForm", (req, res) => {
  res.sendFile(__dirname + "\\views/pjInsertForm.html"); // Provide the path to your pjInsertForm.html file
});

// Handle the form submission for inserting a pj
router.post("/insertPj", async (req, res) => {
  var { id, nombre, descripcion, jugable, grupoDes, grupoDev } = req.body;

  connection.query(
    "call crearPersonaje(?, ?, ?, ?, ?, ?)",
    [id, nombre, descripcion, jugable, grupoDes, grupoDev],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }

      res.redirect("/inserts/pjInsertForm");
    },
  );
});

// Serve the HTML form for inserting a Feature
router.get("/featInsertForm", (req, res) => {
  res.sendFile(__dirname + "\\views/featInsertForm.html"); // Provide the path to your featInsertForm.html file
});

// Handle the form submission for inserting a feat
router.post("/insertFeat", async (req, res) => {
  var { id, nombre, descripcion, version, fechaCreacion, grupoDes, grupoDev } =
    req.body;

  connection.query(
    "call crearFeature(?, ?, ?, ?, ?, ?, ?)",
    [id, nombre, descripcion, version, fechaCreacion, grupoDes, grupoDev],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }

      res.redirect("/inserts/featInsertForm");
    },
  );
});

// Serve the HTML form for inserting a SFX/MUSICA/SPRITE
router.get("/smsInsertForm", (req, res) => {
  res.sendFile(__dirname + "\\views/smsInsertForm.html"); // Provide the path to your smsInsertForm.html file
});

// Handle the form submission for inserting a SFX/MUSICA/SPRITE
router.post("/insertSms", async (req, res) => {
  var { id, tipo, nombre, direccion, grupo } = req.body;
  if (tipo === "Sprite") callArte = "call crearSprite(?, ?, ?, ?)";
  else if (tipo === "Musica") callArte = "call crearMusica(?, ?, ?, ?)";
  else if (tipo === "SFX") callArte = "call crearSFX(?, ?, ?, ?)";
  else res.status(400).send("Ingresar un Tipo Correcto (Sprite, Musica o SFX)");
  connection.query(
    callArte,
    [id, nombre, direccion, grupo],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }

      res.redirect("/inserts/smsInsertForm");
    },
  );
});

// Serve the HTML form for inserting an Animacion
router.get("/animInsertForm", (req, res) => {
  res.sendFile(__dirname + "\\views/animInsertForm.html"); // Provide the path to your animInsertForm.html file
});

// Handle the form submission for inserting an Animacion
router.post("/insertAnim", async (req, res) => {
  var { id, nombre, direccion, grupo, idAsset } = req.body;
  connection.query(
    "call crearAnimacion(?,?,?,?,?)",
    [id, nombre, direccion, grupo, idAsset],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }

      res.redirect("/inserts/animInsertForm");
    },
  );
});

// Serve the HTML form for inserting a Linea_Voz
router.get("/vlInsertForm", (req, res) => {
  res.sendFile(__dirname + "\\views/vlInsertForm.html"); // Provide the path to your vlInsertForm.html file
});

// Handle the form submission for inserting a Linea_Voz
router.post("/insertVl", async (req, res) => {
  var { id, nombre, direccion, idPersonaje, grupo, actorUser, lineaEsp, lineaEng } = req.body;
  connection.query(
    "call crearLineaVoz(?,?,?,?,?,?,?,?)",
    [id, nombre, direccion, idPersonaje, grupo, actorUser, lineaEsp, lineaEng],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }

      res.redirect("/inserts/vlInsertForm");
    },
  );
});

module.exports = router;
