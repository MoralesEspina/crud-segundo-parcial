const express = require('express');
const router = express.Router();
const security = require('../security/verify')
const mysqlConnection = require('../configurations/db-conf');


//Visualizar Personas
router.get("/personas", (req, res) => {
    mysqlConnection.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver Persona Individual
router.get("/personas/:id",security, (req, res) => {
    mysqlConnection.query('Select * from persona where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Persona
router.post("/personas",security, (req, res) => {
    let per = req.body;
    mysqlConnection.query('insert into persona (nombre, apellido,fecha_nacimiento,direccion) values (?,?,?,?)',
        [per.nombre, per.apellido, per.fecha_nacimiento, per.direccion], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar Persona
router.put("/personas/:id",security, (req, res) => {
    let per = req.body;
    mysqlConnection.query('update persona set nombre = ?, apellido = ?, fecha_nacimiento = ?, direccion=? where id = ?',
        [per.nombre, per.apellido, per.fecha_nacimiento, per.direccion, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Persona
router.delete("/personas/:id",security, (req, res) => {
    mysqlConnection.query('delete from persona where id = ?',
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
