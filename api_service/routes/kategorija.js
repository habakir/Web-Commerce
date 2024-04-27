const express = require("express");  
const { sequelize, Kolekcija, Kategorija} = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;


route.get("/", async (req, res) => {
    try{
          const kategorije = await Kategorija.findAll();
          return res.json(kategorije);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

route.get("/:id", async (req, res) => {
    try{
          const kategorije = await Kategorija.findByPk(req.params.id);
          return res.json(kategorije);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.put("/izmeni/:id", async (req, res) => {
      try {
        const kategorije = await Kategorija.findByPk(req.params.id);
    
        if (!kategorije) {
          return res.status(404).json({ error: "Record not found" });
        }
 
        kategorije.naziv = req.body.naziv;
    
        await kategorije.save();
    
        return res.json(kategorije);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error", data: err });
      }
      route.use(authToken);
    });
 
route.post("/", async (req, res) => {
    try{
          const novi = await Kategorija.create(req.body);
          return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
  
route.put("/:id", async (req, res) => {
    try{
          const kategorije = await Kategorija.findByPk(req.params.id);
          kategorije.naziv = req.body.naziv;
          kategorije.save();
          return res.json(kategorije);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
 
route.delete("/:id", async (req, res) => {
    try{
          const kategorije = await Kategorija.findByPk(req.params.id);
          kategorije.destroy();
          return res.json(kategorije.id);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
 