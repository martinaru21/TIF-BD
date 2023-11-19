const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const router = express.Router();
const connection = require("../connectMySQL");

//*************UPDATES*************
//SEDE

// Route to render the initial form to enter SEDE CUIT
router.get("/updateSede", (req, res) => {
  res.sendFile(__dirname + "\\views/enterSedeCUITForm.html");
});

// Route to handle the form submission and redirect to the update form
router.post("/enterSedeCUIT", (req, res) => {
  const { cuit } = req.body;

  // Check if cuit is provided
  if (!cuit) {
    res.status(400).send("CUIT is required");
    return;
  }

  // Redirect to the update form with the provided CUIT
  res.redirect(`/updates/updateThisSede/${cuit}`);
});

// Route to render the update form with SEDE data
router.get("/updateThisSede/:cuit", (req, res) => {
  const cuit = req.params.cuit;

  // SQL query to check if the SEDE with the given CUIT exists
  const checkSedeQuery = `SELECT * FROM SEDE WHERE cuit = ${cuit}`;

  connection.query(checkSedeQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking SEDE:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the SEDE with the given CUIT exists
    if (checkResults.length === 0) {
      res.status(404).send("SEDE not found");
      return;
    }

    // Render the update form with SEDE data
    res.render("updateSedeForm", { sedeData: checkResults[0] });
  });
});

// Route to handle the updated data submission
router.post("/submitUpdatedSede", (req, res) => {
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
    [
      nombre_sede,
      direccion,
      ciudad,
      provincia,
      pais,
      codigoPostal,
      alquiler,
      capacidad,
      cuit,
    ],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error("Error updating SEDE:", updateErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send("SEDE not found for update");
        return;
      }

      res.send(`
      <h1>Success!</h1>
      <button onclick="location.href='/tables/showSedeTable'">Back to Sede Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);
    },
  );
});

//EQUIPAMIENTO

// Route to render the initial form to enter EQUIPAMIENTO ID
router.get("/updateEquip", (req, res) => {
  res.sendFile(__dirname + "\\views/enterEquipIDForm.html");
});

// Route to handle the form submission and redirect to the update form
router.post("/enterEquipID", (req, res) => {
  const { id_equip } = req.body;

  // Check if id_equip is provided
  if (!id_equip) {
    res.status(400).send("ID is required");
    return;
  }

  // Redirect to the update form with the provided id_equip
  res.redirect(`/updates/updateThisEquip/${id_equip}`);
});

// Route to render the update form with Equip data
router.get("/updateThisEquip/:id_equip", (req, res) => {
  const id_equip = req.params.id_equip;

  // SQL query to check if the EQUIPAMIENTO with the given id_equip exists
  const checkEquipQuery = `SELECT * FROM EQUIPAMIENTO WHERE id_equipamiento = ${"'" + id_equip + "'"}`;

  connection.query(checkEquipQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking EQUIPAMIENTO:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the EQUIPAMIENTO with the given CUIT exists
    if (checkResults.length === 0) {
      res.status(404).send("EQUIPAMIENTO not found");
      return;
    }

    // Render the update form with EQUIPAMIENTO data
    res.render("updateEquipForm", { equipData: checkResults[0] });
  });
});

// Route to handle the updated data submission
router.post("/submitUpdatedEquip", (req, res) => {
  var {
    id_equip, nombre_equip, precio, cuit_sede, user
  } = req.body;
  if (user === '') user = null;
  // SQL query to update the EQUIPAMIENTO record
  const updateEquipQuery = `
    UPDATE EQUIPAMIENTO
    SET
      id_equipamiento = ?,
      nombre_equipamiento = ?,
      precio = ?,
      SEDE_cuit = ?,
      user = ?
    WHERE id_equipamiento = ?;
  `;

  // Execute the query with the form data
  connection.query(
    updateEquipQuery,
    [
      id_equip, nombre_equip, precio, cuit_sede, user, id_equip
    ],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error("Error updating EQUIPAMIENTO:", updateErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send("EQUIPAMIENTO not found for update");
        return;
      }

      res.send(`
      <h1>Success!</h1>
      <button onclick="location.href='/tables/showEquipTable'">Back to Equipamiento Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);
    },
  );
});

// Modificar EMPLEADO
app.get("/empleadoModForm", (req, res) => {
  res.sendFile(__dirname + "\\views/enterUserEmpForm.html");
});

// Route to handle the form submission and redirect to the update form
app.post("/enterUserEmp", (req, res) => {
  const { user } = req.body;

  // Verifica si se hay usuario
  if (!user) {
    res.status(400).send("Se necesita un Usuario");
    return;
  }

  // Redirect to the update form with the provided Usuario
  res.redirect(`/updates/updateThisEmpleado/${user}`);
});

// Route to render the update form with EMPLEADO data
app.get("/updateThisEmpleado/:user", (req, res) => {
  const user = req.params.user;

  // SQL query to check if the EMPLEADO with the given USER exists
  const checkEmpleadoQuery = `SELECT * FROM EMPLEADO WHERE user = '${user}'`;

  connection.query(checkEmpleadoQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error chequeando al Empleado:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the EMPLEADO with the given USER exists
    if (checkResults.length === 0) {
      res.status(404).send("No se encontro al Empleado");
      return;
    }
    checkResults[0].fecha_nac =
      checkResults[0].fecha_nac.toLocaleDateString("se-SE");
    checkResults[0].ingreso_empresa =
      checkResults[0].ingreso_empresa.toLocaleDateString("se-SE");
    checkResults[0].ingreso_proyecto =
      checkResults[0].ingreso_proyecto.toLocaleDateString("se-SE");

    // Render the update form with EMPLEADO data
    res.render("updateEmpleadoForm", { empleadoData: checkResults[0] });
  });
});

// Route to handle the updated data submission
app.post("/submitUpdatedEmpleado", (req, res) => {
  const {
    dni,
    nombre_empleado,
    apellido_empleado,
    fecha_nac,
    ingreso_empresa,
    ingreso_proyecto,
    sueldo,
    rubro,
    seniority,
    user,
  } = req.body;

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
    [
      dni,
      nombre_empleado,
      apellido_empleado,
      fecha_nac,
      ingreso_empresa,
      ingreso_proyecto,
      sueldo,
      rubro,
      seniority,
      user,
      user,
    ],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error("Error actualizando Empleado:", updateErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send("No se encontro Empleado para actualizar");
        return;
      }

      res.send(`
        <h1>Success!</h1>
        <button onclick="location.href='/admin'">Back to Admin</button>
        `);
    },
  );
});

// BUG

// Route to render the initial form to enter BUG ID
router.get("/updateBug", (req, res) => {
  res.sendFile(__dirname + "\\views/enterBugIDForm.html");
});

// Route to handle the form submission and redirect to the update form
router.post("/enterBugID", (req, res) => {
  const { id_bug } = req.body;

  // Check if id_bug is provided
  if (!id_bug) {
    res.status(400).send("Bug ID is required");
    return;
  }

  // Redirect to the update form with the provided Bug ID
  res.redirect(`/updates/updateThisBug/${id_bug}`);
});

// Route to render the update form with BUG data
router.get("/updateThisBug/:id_bug", (req, res) => {
  const id_bug = req.params.id_bug;

  // SQL query to check if the BUG with the given ID exists
  const checkBugQuery = `SELECT * FROM BUG WHERE id_bug = ${id_bug}`;

  connection.query(checkBugQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking BUG:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the BUG with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send("BUG not found");
      return;
    }

    // Render the update form with BUG data
    res.render("updateBugForm", { bugData: checkResults[0] });
  });
});

// Route to handle the updated data submission
router.post("/submitUpdatedBug", (req, res) => {
  var {
    id_bug,
    titulo_bug,
    desc_bug,
    prioridad,
    archivo_evidencia,
    id_feature,
    id_escenario,
    tester_user,
  } = req.body;
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
    [
      id_bug,
      titulo_bug,
      desc_bug,
      prioridad,
      archivo_evidencia,
      id_feature,
      id_escenario,
      tester_user,
      id_bug,
    ],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error("Error updating BUG:", updateErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send("BUG not found for update");
        return;
      }

      res.send(`
      <h1>Success!</h1>
      <button onclick="location.href='/tables/showBugTable'">Back to Bug Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);
    },
  );
});

// ASSET

// Route to render the initial form to enter Asset ID
router.get("/updateAsset", (req, res) => {
  res.sendFile(__dirname + "\\views/enterAssetIDForm.html");
});

// Route to handle the form submission and redirect to the update form
router.post("/enterAssetID", (req, res) => {
  const { id_asset } = req.body;

  // Check if id_asset is provided
  if (!id_asset) {
    res.status(400).send("Asset ID is required");
    return;
  }

  // Redirect to the update form with the provided Asset ID
  res.redirect(`/updates/updateThisAsset/${id_asset}`);
});

// Route to render the update form with Asset data
router.get("/updateThisAsset/:id_asset", (req, res) => {
  const id_asset = req.params.id_asset;

  // SQL query to check if the Asset with the given ID exists
  const checkAssetQuery = `SELECT * FROM ASSET INNER JOIN ESCENARIO ON ASSET.id_escenario = ESCENARIO.id_escenario WHERE ASSET.id_escenario = ${
    '"' + id_asset + '"'
  }`;

  connection.query(checkAssetQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking ASSET:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the ASSET with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send("ASSET not found");
      return;
    }

    // Render the update form with ASSET data
    res.render("updateAssetForm", { assetData: checkResults[0] });
  });
});

// Route to handle the updated data submission
router.post("/submitUpdatedAsset", (req, res) => {
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
        console.error("Error updating ASSET:", updateErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send("ASSET not found for update");
        return;
      }

      res.send(`
      <h1>Success!</h1>
      <button onclick="location.href='/tables/showAssetTable'">Back to Asset Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);
    },
  );
});

// PERSONAJE

// Route to render the initial form to enter Personaje ID
router.get("/updatePj", (req, res) => {
  res.sendFile(__dirname + "\\views/enterPjIDForm.html");
});

// Route to handle the form submission and redirect to the update form
router.post("/enterPjID", (req, res) => {
  const { id_pj } = req.body;

  // Check if id_pj is provided
  if (!id_pj) {
    res.status(400).send("Personaje ID is required");
    return;
  }

  // Redirect to the update form with the provided Personaje ID
  res.redirect(`/updates/updateThisPj/${id_pj}`);
});

// Route to render the update form with Personaje data
router.get("/updateThisPj/:id_pj", (req, res) => {
  const id_pj = req.params.id_pj;

  // SQL query to check if the Personaje with the given ID exists
  const checkPersonajeQuery = `SELECT * FROM PERSONAJE INNER JOIN ESCENARIO ON PERSONAJE.id_escenario = ESCENARIO.id_escenario WHERE PERSONAJE.id_escenario = ${
    '"' + id_pj + '"'
  }`;

  connection.query(checkPersonajeQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking Personaje:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the PERSONAJE with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send("PERSONAJE not found");
      return;
    }

    // Render the update form with PERSONAJE data
    res.render("updatePjForm", { pjData: checkResults[0] });
  });
});

// Route to handle the updated data submission
router.post("/submitUpdatedPj", (req, res) => {
  var { id, nombre, descripcion, jugable, grupoDes, grupoDev } = req.body;
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
  connection.query(updatePjQuery, [jugable, id], (updateErr, updateResults) => {
    if (updateErr) {
      console.error("Error updating PERSONAJE:", updateErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if any record was updated
    if (updateResults.affectedRows === 0) {
      res.status(404).send("PERSONAJE not found for update");
      return;
    }

    connection.query(
      updateEscQuery,
      [id, nombre, descripcion, grupoDes, grupoDev, id],
      (updateErr, updateResults) => {
        if (updateErr) {
          console.error("Error updating PERSONAJE:", updateErr);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Check if any record was updated
        if (updateResults.affectedRows === 0) {
          res.status(404).send("PERSONAJE not found for update");
          return;
        }

        res.send(`
          <h1>Success!</h1>
          <button onclick="location.href='/tables/showPjTable'">Back to Personaje Table</button>
          <button onclick="location.href='/admin'">Back to Admin</button>
          `);
      },
    );
  });
});

// FEATURE

// Route to render the initial form to enter Feature ID
router.get("/updateFeat", (req, res) => {
  res.sendFile(__dirname + "\\views/enterFeatIDForm.html");
});

// Route to handle the form submission and redirect to the update form
router.post("/enterFeatID", (req, res) => {
  const { id_feat } = req.body;

  // Check if id_feat is provided
  if (!id_feat) {
    res.status(400).send("Feature ID is required");
    return;
  }

  // Redirect to the update form with the provided Feature ID
  res.redirect(`/updates/updateThisFeat/${id_feat}`);
});

// Route to render the update form with Feature data
router.get("/updateThisFeat/:id_feat", (req, res) => {
  const id_feat = req.params.id_feat;

  // SQL query to check if the Feature with the given ID exists
  const checkFeatQuery = `SELECT * FROM FEATURE WHERE id_feature = ${
    '"' + id_feat + '"'
  }`;

  connection.query(checkFeatQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking FEATURE:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the FEATURE with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send("FEATURE not found");
      return;
    }

    checkResults[0].fecha_creacion =
      checkResults[0].fecha_creacion.toLocaleDateString("se-SE");
    // Render the update form with FEATURE data
    res.render("updateFeatForm", { featData: checkResults[0] });
  });
});

// Route to handle the updated data submission
router.post("/submitUpdatedFeat", (req, res) => {
  var { id, nombre, descripcion, version, fechaCreacion, grupoDes, grupoDev } =
    req.body;
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
        console.error("Error updating FEATURE:", updateErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Check if any record was updated
      if (updateResults.affectedRows === 0) {
        res.status(404).send("FEATURE not found for update");
        return;
      }

      res.send(`
      <h1>Success!</h1>
      <button onclick="location.href='/tables/showFeatTable'">Back to Feature Table</button>
      <button onclick="location.href='/admin'">Back to Admin</button>
      `);
    },
  );
});

// SFX/MUSICA/SPRITE

// Route to render the initial form to enter SMS ID
router.get("/updateSms", (req, res) => {
  res.sendFile(__dirname + "\\views/enterSmsIDForm.html");
});

// Route to handle the form submission and redirect to the update form
router.post("/enterSmsID", (req, res) => {
  const { id_sms } = req.body;

  // Check if id_sms is provided
  if (!id_sms) {
    res.status(400).send("SFX/MUSICA/SPRITE ID is required");
    return;
  }

  // Redirect to the update form with the provided SMS ID
  res.redirect(`/updates/updateThisSms/${id_sms}`);
});

// Route to render the update form with SMS data
router.get("/updateThisSms/:id_sms", (req, res) => {
  const id_sms = req.params.id_sms;

  // SQL query to check if the SMS with the given ID exists
  const checkSMSQuery = `SELECT * FROM SPRITE_SFX_MUSICA INNER JOIN ARTE ON ARTE.id_arte = SPRITE_SFX_MUSICA.id_arte WHERE SPRITE_SFX_MUSICA.id_arte = ${
    '"' + id_sms + '"'
  }`;

  connection.query(checkSMSQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking SFX/MUSICA/SPRITE:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the SFX/MUSICA/SPRITE with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send("SFX/MUSICA/SPRITE not found");
      return;
    }

    // Render the update form with SFX/MUSICA/SPRITE data
    res.render("updateSmsForm", { smsData: checkResults[0] });
  });
});

// Route to handle the updated data submission
router.post("/submitUpdatedSms", (req, res) => {
  var { id, tipo, nombre, direccion, grupo } = req.body;
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
  connection.query(updateSmsQuery, [tipo, id], (updateErr, updateResults) => {
    if (updateErr) {
      console.error("Error updating SFX/MUSICA/SPRITE:", updateErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if any record was updated
    if (updateResults.affectedRows === 0) {
      res.status(404).send("SFX/MUSICA/SPRITE not found for update");
      return;
    }

    connection.query(
      updateArtQuery,
      [id, nombre, direccion, grupo, id],
      (updateErr, updateResults) => {
        if (updateErr) {
          console.error("Error updating SFX/MUSICA/SPRITE:", updateErr);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Check if any record was updated
        if (updateResults.affectedRows === 0) {
          res.status(404).send("SFX/MUSICA/SPRITE not found for update");
          return;
        }

        res.send(`
          <h1>Success!</h1>
          <button onclick="location.href='/tables/showSmsTable'">Back to SFX/MUSICA/SPRITE Table</button>
          <button onclick="location.href='/admin'">Back to Admin</button>
          `);
      },
    );
  });
});

// ANIMACION

// Route to render the initial form to enter ANIMACION ID
router.get("/updateAnim", (req, res) => {
  res.sendFile(__dirname + "\\views/enterAnimIDForm.html");
});

// Route to handle the form submission and redirect to the update form
router.post("/enterAnimID", (req, res) => {
  const { id_anim } = req.body;

  // Check if id_anim is provided
  if (!id_anim) {
    res.status(400).send("ANIMACION ID is required");
    return;
  }

  // Redirect to the update form with the provided anim ID
  res.redirect(`/updates/updateThisAnim/${id_anim}`);
});

// Route to render the update form with SMS data
router.get("/updateThisAnim/:id_anim", (req, res) => {
  const id_anim = req.params.id_anim;

  // SQL query to check if the ANIMACION with the given ID exists
  const checkAnimQuery = `SELECT * FROM ANIMACION INNER JOIN ARTE ON ARTE.id_arte = ANIMACION.id_arte WHERE ANIMACION.id_arte = ${
    '"' + id_anim + '"'
  }`;

  connection.query(checkAnimQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking ANIMACION:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the ANIMACION with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send("ANIMACION not found");
      return;
    }

    // Render the update form with ANIMACION data
    res.render("updateAnimForm", { animData: checkResults[0] });
  });
});

// Route to handle the updated data submission
router.post("/submitUpdatedAnim", (req, res) => {
  var { id, nombre, direccion, grupo, idAsset } = req.body;
  // SQL query to update the PERSONAJE record
  const updateAnimQuery = `
    UPDATE ANIMACION
    SET
      id_escenario = ?
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
  connection.query(updateAnimQuery, [idAsset, id], (updateErr, updateResults) => {
    if (updateErr) {
      console.error("Error updating ANIMACION:", updateErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if any record was updated
    if (updateResults.affectedRows === 0) {
      res.status(404).send("ANIMACION not found for update");
      return;
    }

    connection.query(
      updateArtQuery,
      [id, nombre, direccion, grupo, id],
      (updateErr, updateResults) => {
        if (updateErr) {
          console.error("Error updating ANIMACION:", updateErr);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Check if any record was updated
        if (updateResults.affectedRows === 0) {
          res.status(404).send("ANIMACION not found for update");
          return;
        }

        res.send(`
          <h1>Success!</h1>
          <button onclick="location.href='/tables/showAnimTable'">Back to ANIMACION Table</button>
          <button onclick="location.href='/admin'">Back to Admin</button>
          `);
      },
    );
  });
});

// LINEA_VOZ

// Route to render the initial form to enter LINEA_VOZ ID
router.get("/updateVl", (req, res) => {
  res.sendFile(__dirname + "\\views/enterVlIDForm.html");
});

// Route to handle the form submission and redirect to the update form
router.post("/enterVlID", (req, res) => {
  const { id_vl } = req.body;

  // Check if id_vl is provided
  if (!id_vl) {
    res.status(400).send("LINEA_VOZ ID is required");
    return;
  }

  // Redirect to the update form with the provided vl ID
  res.redirect(`/updates/updateThisVl/${id_vl}`);
});

// Route to render the update form with SMS data
router.get("/updateThisVl/:id_vl", (req, res) => {
  const id_vl = req.params.id_vl;

  // SQL query to check if the LINEA_VOZ with the given ID exists
  const checkVlQuery = `SELECT * FROM LINEA_VOZ INNER JOIN ARTE ON ARTE.id_arte = LINEA_VOZ.id_arte WHERE LINEA_VOZ.id_arte = ${
    '"' + id_vl + '"'
  }`;

  connection.query(checkVlQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking LINEA_VOZ:", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if the LINEA_VOZ with the given ID exists
    if (checkResults.length === 0) {
      res.status(404).send("LINEA_VOZ not found");
      return;
    }

    // Render the update form with LINEA_VOZ data
    res.render("updateVlForm", { vlData: checkResults[0] });
  });
});

// Route to handle the updated data submission
router.post("/submitUpdatedVl", (req, res) => {
  var { id, nombre, direccion, idPersonaje, grupo, actorUser, lineaEsp, lineaEng } = req.body;
  // SQL query to update the PERSONAJE record
  const updateVlQuery = `
    UPDATE LINEA_VOZ
    SET
      txt_sp = ?,
      txt_eng = ?,
      user = ?,
      id_escenario = ?
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
  connection.query(updateVlQuery, [lineaEsp, lineaEng, actorUser, idPersonaje, id], (updateErr, updateResults) => {
    if (updateErr) {
      console.error("Error updating LINEA_VOZ:", updateErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if any record was updated
    if (updateResults.affectedRows === 0) {
      res.status(404).send("LINEA_VOZ not found for update");
      return;
    }

    connection.query(
      updateArtQuery,
      [id, nombre, direccion, grupo, id],
      (updateErr, updateResults) => {
        if (updateErr) {
          console.error("Error updating LINEA_VOZ:", updateErr);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Check if any record was updated
        if (updateResults.affectedRows === 0) {
          res.status(404).send("LINEA_VOZ not found for update");
          return;
        }

        res.send(`
          <h1>Success!</h1>
          <button onclick="location.href='/tables/showVlTable'">Back to LINEA_VOZ Table</button>
          <button onclick="location.href='/admin'">Back to Admin</button>
          `);
      },
    );
  });
});

module.exports = router;
