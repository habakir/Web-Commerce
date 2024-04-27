const express = require('express');
const cors = require('cors');
const path = require('path');
const Joi = require('joi');
const fs = require('fs');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/.env` });
const jwt = require('jsonwebtoken');

function getCookies(req) {
  if (req.headers.cookie == null) return {};

  const rawCookies = req.headers.cookie;
  const parsedCookies = {};

  const parsedCookie = rawCookies.split('=');
  parsedCookies[parsedCookie[0]] = parsedCookie[1];
  console.log(parsedCookies);
  return parsedCookies;
}

function authToken(req, res, next) {
  const cookies = getCookies(req);
  const token = cookies['token'];
  console.log(token);
  console.log(process.env.ACCESS_TOKEN_SECRET);
  if (token == null) return res.redirect(302, '/administrator/login');
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect(302, '/administrator/login')
    req.user = user
    next();
  });
}

let unless = function (middleware, ...paths) {
  return function (req, res, next) {
    const pathCheck = paths.some(path => path === req.path);
    pathCheck ? next() : middleware(req, res, next);
  };
};

app.use(unless(authToken, "/administrator/login", "/administrator/register"));

app.get('/administrator', authToken, (req, res) => {
  res.sendFile('index.html', { root: './static/administrator' });
});

app.get('/administrator/register', (req, res) => {
  res.sendFile('register.html', { root: './static/administrator' });
});


app.get('/administrator/login', (req, res) => {
  res.sendFile('login.html', { root: './static/administrator' });
});

app.use(express.static(path.join(__dirname, 'static')));
const BP = require('body-parser');
app.use('/novi-model', BP.urlencoded({extended: false}));
app.use('/novi-model', BP.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'administrator/index.html'));
});

app.post("/novi-model", (req, res) => {

    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        kategorija: Joi.number().integer().min(1).required(),
        kolicina: Joi.number().greater(0).required()
    });

    const {error, succ} = shema.validate(req.body);

    if(error){
        res.send("Greska: " + error.details[0].message);
      return;

    } else {
        req.body.opis.replace(/\r?\n|\r/g, '<br>');

        fs.appendFile("jela.txt", 
                 JSON.stringify(req.body) + "\n", 
                 function(err, succ){
                     res.send("Poruka je poslana, očekujte odgovor uskoro");
                 }
            );

    }

})

app.get("/kolekcija", (req, res) => {

    const jela = [];

    fs.readFile('jela.txt', 'utf8', (err, data) => {

        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        }

     const redovi = data.split('\n');
     console.log(redovi);
     console.log(data);

        for(let i = 0; i < redovi.length; i++){
           if (redovi[i] == "") continue;

          let obj = JSON.parse( redovi[i] );
          jela.push(obj);
        }
        res.json(jela);
      });
    })
app.listen(8000);