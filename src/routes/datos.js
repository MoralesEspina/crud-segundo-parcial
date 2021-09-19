const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


//Visualizar docente
router.get("/", (req, res) => {
    res.send('Nombre: "Esdras Mefiboseth Morales Espina" , Carné: "0907-18-9909');
});

module.exports = router;