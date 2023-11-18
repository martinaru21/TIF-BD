const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const router = express.Router();
const tablasRouter = require("../routes/tablas.js")
const insertsRouter = require("../routes/inserts.js")
const updatesRouter = require("../routes/updates.js")
const deletesRouter = require("../routes/deletes/deletes.js")

//*************PAGINA PRINCIPAL*************
router.get('/', (req, res) => {
  res.send(`
    <h1>Menu Principal</h1>
    <button onclick="location.href='/consultas'">Consultas</button>
    <button onclick="location.href='/admin'">Administrador</button>
  `);
});

//*************MENU CONSULTAS*************
router.get('/consultas', (req, res) => {
  res.send(`
    <h1>Consultas</h1>
    <button onclick="location.href='/tables/showBugTable'">Show Bug Table</button>
    <button onclick="location.href='/tables/showSedeTable'">Show Sede Table</button>
    <button onclick="location.href='/tables/showDevTable'">Show Dev Table</button>
    <button onclick="location.href='/tables/showEquipamientoTable'">Show Equipamiento Table</button>
    <button onclick="location.href='/tables/showAssetTable'">Show Asset Table</button>
    <button onclick="location.href='/tables/showPjTable'">Show Personaje Table</button>
    <button onclick="location.href='/tables/showSmsTable'">Show SFX/Musica/Sprites Table</button>
    <button onclick="location.href='/tables/showAnimTable'">Show Animaciones Table</button>

  `);
});

//*************MENU ADMIN*************
router.get('/admin', (req, res) => {
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
    <button onclick="location.href='/animMenu'">Animaciones</button>
    <button onclick="location.href='/vlMenu'">Lineas de Voz</button>
  `);
});

  //*************MENU BUGS*************
  router.get('/bugMenu', (req, res) => {
      res.send(`
        <h1>Administrador: Bugs</h1>
        <button onclick="location.href='/inserts/bugInsertForm'">Nuevo</button>
        <button onclick="location.href='/updates/updateBug'">Modificar</button>
        <button onclick="location.href='/deletes/deleteBug'">Borrar</button>
      `);
    });

//*************MENU SEDE*************
router.get('/sedeMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Sedes</h1>
    <button onclick="location.href='/inserts/sedeInsertForm'">Nuevo</button>
    <button onclick="location.href='/updates/updateSede'">Modificar</button>
    <button onclick="location.href='/deletes/deleteSede'">Borrar</button>
  `);
});

  //*************MENU EQUIPAMIENTO*************
  router.get('/equipMenu', (req, res) => {
      res.send(`
        <h1>Administrador: Equipamiento</h1>
        <button onclick="location.href='/inserts/sedeInsertForm'">Nuevo</button>
        <button onclick="location.href='/sedeInsertForm'">Modificar</button>
        <button onclick="location.href='/deletes/deleteEquipamiento'">Borrar</button>
      `);
    });

//*************MENU DEVELOPERS*************
router.get('/developerMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Developers</h1>
    <button onclick="location.href='/inserts/developerInsForm'">Nuevo</button>
    <button onclick="location.href='/updates/developerModForm'">Modificar</button>
    <button onclick="location.href='/deletes/developerDelForm'">Eliminar</button>
  `);
});

//*************MENU DESIGNERS*************
router.get('/designerMenu', (req, res) => {
  res.send(`
    <h1>Administrador: Designers</h1>
    <button onclick="location.href='/inserts/designerInsForm'">Nuevo</button>
    <button onclick="location.href='/designerModForm'">Modificar</button>
    <button onclick="location.href='/designerDelForm'">Eliminar</button>
  `);
});

//*************MENU ARTISTAS*************
router.get('/artistaMenu', (req, res) => {
res.send(`
  <h1>Administrador: Artistas</h1>
  <button onclick="location.href='/inserts/sedeInsertForm'">Nuevo</button>
  <button onclick="location.href='/sedeInsertForm'">Modificar</button>
  <button onclick="location.href='/sedeInsertForm'">Insertar</button>
`);
});

//*************MENU TESTERS*************
router.get('/testerMenu', (req, res) => {
res.send(`
  <h1>Administrador: Tester</h1>
  <button onclick="location.href='/inserts/sedeInsertForm'">Nuevo</button>
  <button onclick="location.href='/sedeInsertForm'">Modificar</button>
  <button onclick="location.href='/sedeInsertForm'">Insertar</button>
`);
});

//*************MENU ASSETS*************
router.get('/assetMenu', (req, res) => {
res.send(`
  <h1>Administrador: Asset</h1>
  <button onclick="location.href='/inserts/assetInsertForm'">Nuevo</button>
  <button onclick="location.href='/updates/updateAsset'">Modificar</button>
`);
});

//*************MENU PERSONAJES*************
router.get('/pjMenu', (req, res) => {
res.send(`
  <h1>Administrador: Personajes</h1>
  <button onclick="location.href='/inserts/pjInsertForm'">Nuevo</button>
  <button onclick="location.href='/updates/updatePj'">Modificar</button>
`);
});

//*************MENU FEATURE*************
router.get('/featMenu', (req, res) => {
res.send(`
  <h1>Administrador: Features</h1>
  <button onclick="location.href='/inserts/featInsertForm'">Nuevo</button>
  <button onclick="location.href='/updates/updatefeat'">Modificar</button>
`);
});

//*************MENU SFX/MUSICA/SPRITE*************
router.get('/smsMenu', (req, res) => {
res.send(`
  <h1>Administrador: SFX/Musica/Sprites</h1>
  <button onclick="location.href='/inserts/smsInsertForm'">Nuevo</button>
  <button onclick="location.href='/updates/updateSms'">Modificar</button>
`);
});

//*************MENU ANIMACIONES*************
router.get('/animMenu', (req, res) => {
res.send(`
  <h1>Administrador: ANIMACIONES</h1>
  <button onclick="location.href='/inserts/animInsertForm'">Nuevo</button>
  <button onclick="location.href='/updates/updateAnim'">Modificar</button>
`);
});

router.use('/tables/', tablasRouter);
router.use('/inserts/', insertsRouter);
router.use('/updates/', updatesRouter);
router.use('/deletes/', deletesRouter);

module.exports = router;