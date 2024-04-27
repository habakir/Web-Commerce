const express = require("express");
const { sequelize, Kolekcija, Kategorija, KolekcijaModel, Materijal, StavkaNarudzbine} = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;

route.get("/", async (req, res) => {
    try{
         const kolekcija = await Kolekcija.findAll();
         return res.json(kolekcija);
         
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

route.get("/:id", async (req, res) => {
    try{
          const kolekcija = await Kolekcija.findByPk(req.params.id);
          return res.json(kolekcija);     
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.put("/promeni-cenu/:id", async (req, res) => {
     try {
       const kolekcija = await Kolekcija.findByPk(req.params.id);
   
       if (!kolekcija) {
         return res.status(404).json({ error: "Record not found" });
       }

       kolekcija.cena = req.body.cena;
   
       await kolekcija.save();
   
       return res.json(kolekcija);
     } catch (err) {
       console.error(err);
       res.status(500).json({ error: "Internal Server Error", data: err });
     }
     route.use(authToken);
   });

   route.put("/izmeni/:id", async (req, res) => {
     try {
       const kolekcija = await Kolekcija.findByPk(req.params.id);
   
       if (!kolekcija) {
         return res.status(404).json({ error: "Record not found" });
       }

       kolekcija.naziv = req.body.naziv;
       kolekcija.opis = req.body.opis;
   
       await kolekcija.save();
   
       return res.json(kolekcija);
     } catch (err) {
       console.error(err);
       res.status(500).json({ error: "Internal Server Error", data: err });
     }
     route.use(authToken);
   });
 
route.post("/", async (req, res) => {
    try{
          const kategorijaId = req.body.kategorija;
          req.body.Kategorija_id = kategorijaId;
          const novi = await Kolekcija.create(req.body);
          return res.json(novi);     
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
  
route.put("/:id", async (req, res) => {
    try{
          const kolekcija = await Kolekcija.findByPk(req.params.id);
          kolekcija.naziv = req.body.naziv;
          kolekcija.opis = req.body.opis;
          kolekcija.cena = req.body.cena;
          kolekcija.Kategorija_id = req.body.Kategorija_id;
          kolekcija.save();
          return res.json(kolekcija);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
 
route.delete("/:id", async (req, res) => {
    try{
          const kolekcija = await Kolekcija.findByPk(req.params.id);
          kolekcija.destroy();
          return res.json(kolekcija.id);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });

 