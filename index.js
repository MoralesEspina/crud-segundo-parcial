const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const dbConf=require('./configurations/db-conf');

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: dbConf.host,
    user: dbConf.user,
    password: dbConf.password,
    database: dbConf.database
});

//Visualizar Estudiantes
app.get("/estudiantes", (req, res) => {
    console.log("get lista estudiantes");
    mysqlConnection.query('Select * from estudiante', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});


//Ver Estudiante en Especifico
app.get("/estudiantes/:id", (req, res) => {
    console.log("get estudiante");
    mysqlConnection.query('Select * from estudiante where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Estudiante
app.post("/estudiantes", (req, res) => {
    console.log("crear estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into estudiante (nombre, apellido, edad, grado) values (?,?,?,?)',
        [est.Nombre, est.Apellido, est.Edad, est.Grado], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar Estuadiante
app.put("/estudiantes/:id", (req, res) => {
    console.log("update estudiante");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estudiante set nombre = ?, apellido = ?, edad = ?, grado=? where id = ?',
        [est.Nombre, est.Apellido, est.Edad, est.Grado, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Estudiante
app.delete("/estudiantes/:id", (req, res) => {
    console.log("update estudiante ");
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

app.listen(process.env.PORT||3000);