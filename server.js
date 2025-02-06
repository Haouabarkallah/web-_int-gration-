const express = require('express');  
const bodyParser = require('body-parser');  
const app = express();  
const PORT = process.env.PORT || 3000;  

app.use(bodyParser.urlencoded({ extended: true }));  
app.use(express.static('public'));  
app.set('view engine', 'ejs');  

let applications = [];  

app.get('/', (req, res) => {  
    res.render('applications', { applications });  
});  

app.post('/submit', (req, res) => {  
    const { name, program } = req.body;  
    applications.push({ name, program, status: 'En attente', message: '' });  
    res.redirect('/');  
});  

app.post('/update-status/:index', (req, res) => {  
    const index = req.params.index;  
    const { status, message } = req.body;  
    applications[index].status = status;  
    applications[index].message = message;  
    res.redirect('/');  
});  

app.listen(PORT, () => {  
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);  
});