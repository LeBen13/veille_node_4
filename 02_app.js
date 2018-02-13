const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');


const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs'); 
app.use(express.static('public'));

///////////////////////////////Accueil///////////////////////////////////////
app.get('/', (req, res) => {
 console.log('accueil')
 res.render(__dirname + '/templates/accueil');
});
///////////////////////////////Membre///////////////////////////////////////

app.get('/formulaire', function (req, res) {
 res.render(__dirname + '/templates/formulaire');
}).post(urlencodedParser, function(req, res) {
 
  fs.readFile('membres.json', (err, data) => {
    if (err) return console.error(err);

    let newData = JSON.parse(data);

    newData.membres.push(req.body);


    fs.writeFile('membres.json', JSON.stringify(newData));

    res.render(__dirname + '/templates/formulaire');
  });
});


app.get('/tableau', function(req, res) {
  fs.readFile('membres.json', (err, data) => {
    if (err) return console.error(err);

    res.render(__dirname + '/templates/tableau', {data: JSON.parse(data)});
  });
});




//////////////////////////////////////////////////////////////////////
/*------------------------Route membres------------------------------*/
//////////////////////////////////////////////////////////////////////





    var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Exemple l'application écoute sur http://%s:%s", host, port);
});