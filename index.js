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

//Visualizar Personas
app.get("/personas", (req, res) => {
    console.log("get lista personas");
    mysqlConnection.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});


//Ver Persona en Especifico
app.get("/personas/:id", (req, res) => {
    console.log("get persona");
    mysqlConnection.query('Select * from persona where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Estudiante
app.post("/personas", (req, res) => {
    console.log("crear persona");
    let per = req.body;
    console.log(per);
    mysqlConnection.query('insert into persona (nombre, apellido, fecha_nacimiento, Direccion) values (?,?,?,?)',
        [per.Nombre, per.Apellido, per.Edad, per.Grado], (err, result) => {
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
    mysqlConnection.query('update persona set nombre = ?, apellido = ?, fecha_nacimiento = ?, Direccion=? where id = ?',
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
    console.log("update persona ");
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

app.listen(process.env.PORT||3000);