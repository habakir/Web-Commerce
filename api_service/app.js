const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ msg: 'No token provided. Access denied.' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: 'Failed to authenticate token. Access denied.' });
        }
        req.user = user;
        next();
    });
}
  
 
const corsOptions = {
	origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:8080', 'http://localhost:8082']
  };  
const { sequelize, Kolekcija, Kategorija, KolekcijaModel, Mateirjal, StavkaNarudzbine, Narudzbina } = require("./models");
const app = express();
app.use(cors(corsOptions));

app.use(authToken);

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});
const kolekcijaRoutes = require("./routes/kolekcija.js");
app.use("/kolekcija", kolekcijaRoutes);

const kategorijaRoutes = require("./routes/kategorija.js");
app.use("/kategorija", kategorijaRoutes);

const narudzbinaRoutes = require("./routes/narudzbina.js");
app.use("/narudzbina", narudzbinaRoutes);

const materijalRoutes = require("./routes/materijal.js");
app.use("/materijal", materijalRoutes);

app.listen({ port:9000 }, async () => {
	console.log("Started server on localhost:9000");
	await sequelize.sync({force:false});
	console.log("DB synced");
});
