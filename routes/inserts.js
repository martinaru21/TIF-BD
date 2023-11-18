const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const router = express.Router();
const connection = require('../connectMySQL');


//*************INSERTS*************
  // Serve the HTML form for inserting a SEDE
  router.get('/sedeInsertForm', (req, res) => {
    res.sendFile(__dirname + '\\views/sedeInsertForm.html'); // Provide the path to your sedeInsertForm.html file
  });
  
  // Handle the form submission for inserting a SEDE
  router.post('/insertSede', async (req, res) => {
    const { cuit, nombre_sede, direccion, ciudad, provincia, pais, codigoPostal, alquiler, capacidad } = req.body;
    connection.query("call crearSede(?, ?, ?, ?, ?, ?, ?, ?, ?)", [cuit, nombre_sede, direccion, ciudad, provincia, pais, codigoPostal, alquiler, capacidad], function (err, result){
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
        res.redirect('/inserts/sedeInsertForm')

    });
  });

    // Serve the HTML form for inserting a Developer
  router.get('/developerInsForm', (req, res) => {
    res.sendFile(__dirname + '\\views/developerInsForm.html'); // Provide the path to your sedeInsertForm.html file
  });
  
  // Handle the form submission for inserting a DEV
  router.post('/insertDeveloper', async (req, res) => {
    const { dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo } = req.body;
    connection.query("call crearDeveloper(?,?,?,?,?,?,?,?,?,?)", [dni, nombre, apellido, fecha_nac, ing_emp, ing_proy, sueldo, rubro, seniority, grupo], function (err, result){
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
        res.redirect('/inserts/developerInsForm')

    });
  });

  // Serve the HTML form for inserting a bug
  router.get('/bugInsertForm', (req, res) => {
    res.sendFile(__dirname + '\\views/bugInsertForm.html'); // Provide the path to your bugInsertForm.html file
  });
  
  // Handle the form submission for inserting a bug
  router.post('/insertBug', async (req, res) => {
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
        res.redirect('/inserts/bugInsertForm')

    });
  });

  // Serve the HTML form for inserting an asset
  router.get('/assetInsertForm', (req, res) => {
    res.sendFile(__dirname + '\\views/assetInsertForm.html'); // Provide the path to your assetInsertForm.html file
  });
  
  // Handle the form submission for inserting a asset
  router.post('/insertAsset', async (req, res) => {
    var { id, nombre, descripcion, grupoDes, grupoDev } = req.body;

    connection.query("call crearAsset(?, ?, ?, ?, ?)", [id, nombre, descripcion, grupoDes, grupoDev], function (err, result)
    {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }

        res.redirect('/inserts/assetInsertForm')
    });
  });

    // Serve the HTML form for inserting a personaje
  router.get('/pjInsertForm', (req, res) => {
    res.sendFile(__dirname + '\\views/pjInsertForm.html'); // Provide the path to your pjInsertForm.html file
  });
  
  // Handle the form submission for inserting a pj
  router.post('/insertPj', async (req, res) => {
    var { id,  nombre, descripcion, jugable, grupoDes, grupoDev } = req.body;

    connection.query("call crearPersonaje(?, ?, ?, ?, ?, ?)", [id, nombre, descripcion, jugable, grupoDes, grupoDev], function (err, result)
    {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }

        res.redirect('/inserts/pjInsertForm')
    });
  });

    // Serve the HTML form for inserting a Feature
    router.get('/featInsertForm', (req, res) => {
      res.sendFile(__dirname + '\\views/featInsertForm.html'); // Provide the path to your featInsertForm.html file
    });
    
    // Handle the form submission for inserting a feat
    router.post('/insertFeat', async (req, res) => {
      var { id,  nombre, descripcion, version, fechaCreacion, grupoDes, grupoDev } = req.body;
  
      connection.query("call crearFeature(?, ?, ?, ?, ?, ?, ?)", [id,  nombre, descripcion, version, fechaCreacion, grupoDes, grupoDev], function (err, result)
      {
          if (err) {
              console.log("err:", err);
          } else {
              console.log("results:", result);
          }
  
          res.redirect('/inserts/featInsertForm')
      });
    });  

// Serve the HTML form for inserting a SFX/MUSICA/SPRITE
router.get('/smsInsertForm', (req, res) => {
  res.sendFile(__dirname + '\\views/smsInsertForm.html'); // Provide the path to your smsInsertForm.html file
});

// Handle the form submission for inserting a SFX/MUSICA/SPRITE
router.post('/insertSms', async (req, res) => {
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

      res.redirect('/inserts/smsInsertForm')
  });
});    

module.exports = router;