const express = require('express');
const app = express();
const cors = require('cors')

app.set('port', process.env.PORT || 3000);


app.use(express.json());
app.use(cors());

app.use(require('./routes/datos'));
app.use(require('./routes/persona'));
app.use(require('./routes/docente'));
app.use(require('./routes/estudiante'));
app.use(require('./routes/curso'));
app.use(require('./routes/estudiante_curso'));
app.use(require('./routes/curso_docente'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


