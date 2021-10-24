const express = require('express');
const router = express.Router();

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
router.get("/personas/:id", (req, res, next) => {
    mysqlConnection.query('Select * from persona where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
    next();
});

//Crear Persona
router.post("/personas", (req, res, next) => {
    let per = req.body;
    mysqlConnection.query('insert into persona (nombre, apellido,fecha_nacimiento,direccion) values (?,?,?,?)',
        [per.nombre, per.apellido, per.fecha_nacimiento, per.Direccion], (err, result) => {
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
router.put("/personas/:id", (req, res) => {
    let per = req.body;
    mysqlConnection.query('update persona set nombre = ?, apellido = ?, fecha_nacimiento = ?, direccion=? where id = ?',
        [per.nombre, per.apellido, per.fecha_nacimiento, per.Direccion, req.params.id], (err, result) => {
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
router.delete("/personas/:id", (req, res) => {
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
