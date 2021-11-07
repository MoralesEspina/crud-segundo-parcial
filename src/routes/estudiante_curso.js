const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


//Visualizar curso_docente
router.get("/estudiantes_curso", (req, res) => {
    mysqlConnection.query('Select * from estudiante_curso', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver estudiantes_curso Individual
router.get("/estudiantes_curso/:id", (req, res) => {
    mysqlConnection.query('Select * from estudiante_curso where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Persona
router.post("/estudiantes_curso", (req, res) => {
    let doc = req.body;
    mysqlConnection.query('insert into estudiante_curso (id_estudiante, id_curso, status, fecha_inicio, fecha_fin) values (?,?,?,?,?)',
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

//Actualizar estudiantes_curso
router.put("/estudiantes_curso/:id", (req, res) => {
    let doc = req.body;
    mysqlConnection.query('update estudiante_curso set id_estudiante = ?, id_curso = ?, status = ?, fecha_inicio = ?, fecha_fin = ? where id = ?',
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


//Eliminar estudiantes_curso
router.delete("/estudiantes_curso/:id", (req, res) => {
    mysqlConnection.query('delete from estudiante_curso where id = ?',
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