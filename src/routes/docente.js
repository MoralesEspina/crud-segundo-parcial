const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


//Visualizar docente
router.get("/maestros", (req, res) => {
    mysqlConnection.query('Select * from docente', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver docente Individual
router.get("/maestros/:id", (req, res) => {
    mysqlConnection.query('Select * from docente where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Persona
router.post("/maestros", (req, res) => {
    let doc = req.body;
    mysqlConnection.query('insert into docente (id_persona, fecha_ingreso) values (?,?)',
        [doc.idpersona, doc.fecha_ingreso], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar docente
router.put("/maestros/:id", (req, res) => {
    let doc = req.body;
    mysqlConnection.query('update docente set id_persona = ?, fecha_ingreso = ? where id = ?',
 
        [doc.idpersona, doc.fecha_ingreso, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar docente
router.delete("/maestros/:id", (req, res) => {
    mysqlConnection.query('delete from docente where id = ?',
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