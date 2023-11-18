const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const router = express.Router();
const connection = require('../connectMySQL');

// Route to render the form to enter BUG ID for deletion
router.get('/deleteBug', (req, res) => {
    res.send(`
      <h2>Delete BUG</h2>
      <form action="/deletes/deleteBug" method="post">
        <label for="id_bug">ID Bug:</label>
        <input type="text" name="id_bug" required><br>
        <button type="submit">Delete BUG</button>
      </form>
    `);
  });
  
  // Route to handle the form submission and delete the BUG
  router.post('/deleteBug', (req, res) => {
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
      <button onclick="location.href='/tables/showBugTable'">Back to Bug Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);
    });
  });
  
  // Route to render the form to enter EQUIPAMIENTO ID for deletion
  router.get('/deleteEquipamiento', (req, res) => {
    res.send(`
      <h2>Delete EQUIPAMIENTO</h2>
      <form action="/deletes/deleteEquipamiento" method="post">
        <label for="id_equipamiento">ID Equipamiento:</label>
        <input type="text" name="id_equipamiento" required><br>
        <button type="submit">Delete EQUIPAMIENTO</button>
      </form>
    `);
  });
  
  // Route to handle the form submission and delete the EQUIPAMIENTO
  router.post('/deleteEquipamiento', (req, res) => {
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
      <button onclick="location.href='/tables/showEquipamientoTable'">Back to Equipamiento Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);
    });
  });
  


    module.exports = router;