const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


//Visualizar curso_docente
router.get("/curso_docente", (req, res) => {
    mysqlConnection.query('Select * from curso_docente', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver curso_docente Individual
router.get("/curso_docente/:id", (req, res) => {
    mysqlConnection.query('Select * from curso_docente where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Persona
router.post("/curso_docente", (req, res) => {
    let doc = req.body;
    mysqlConnection.query('insert into curso_docente (id_docente, id_curso, status, fecha_inicio, fecha_fin) values (?,?,?,?,?)',
        [doc.id_persona, doc.fecha_ingreso], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar curso_docente
router.put("/curso_docente/:id", (req, res) => {
    let doc = req.body;
    mysqlConnection.query('update curso_docente set id_docente = ?, id_curso = ?, status = ?, fecha_inicio = ?, fecha_fin = ?, where id = ?',
        [doc.id_persona, doc.fecha_ingreso, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


//Eliminar curso_docente
router.delete("/curso_docente/:id", (req, res) => {
    mysqlConnection.query('delete from curso_docente where id = ?',
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