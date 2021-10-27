const express = require('express');
const router = express.Router();
const security = require('../security/verify')
const mysqlConnection = require('../configurations/db-conf');


//Visualizar estudiante
router.get("/estudiantes",security, (req, res) => {
    mysqlConnection.query('Select * from estudiante', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver estudiante Individual
router.get("/estudiantes/:id",security, (req, res) => {
    mysqlConnection.query('Select * from estudiante where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Persona
router.post("/estudiantes",security, (req, res) => {
    let doc = req.body;
    mysqlConnection.query('insert into estudiante (idpersona, fecha_ingreso, carnet, status) values (?,?,?,?)',
        [doc.idpersona, doc.fecha_ingreso, doc.carnet, doc.status], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar estudiante
router.put("/estudiantes/:id",security, (req, res) => {
    let doc = req.body;
    mysqlConnection.query('update estudiante set idpersona = ?, fecha_ingreso = ?, carnet = ?, status = ? where id = ?',
        [doc.idpersona, doc.fecha_ingreso,doc.carnet, doc.status, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


//Eliminar estudiante
router.delete("/estudiantes/:id",security, (req, res) => {
    mysqlConnection.query('delete from estudiante where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Eliminado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});
module.exports = router;