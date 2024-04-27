const express = require("express");
const { sequelize, KolekcijaModel, Materijal, Kolekcija} = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;

route.get("/", async (req, res) => {
    try{
          const materijali = await Materijal.findAll();
          return res.json(materijali);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

route.get("/:id", async (req, res) => {
    try{
          const materijali = await Materijal.findByPk(req.params.id);
          return res.json(materijali);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.put("/izmeni/:id", async (req, res) => {
      try {
        const materijali = await Materijal.findByPk(req.params.id);
    
        if (!materijali) {
          return res.status(404).json({ error: "Record not found" });
        }
 
        materijali.naziv = req.body.naziv;
    
        await materijali.save();
    
        return res.json(materijali);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error", data: err });
      }
      route.use(authToken);
    });

route.post("/", async (req, res) => {
    try{
          const novi = await Materijal.create(req.body);
          return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
  
route.put("/:id", async (req, res) => {
    try{
          const materijali = await Materijal.findByPk(req.params.id);
          materijali.naziv = req.body.naziv;
          materijali.save();
          return res.json(materijali);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
 
route.delete("/:id", async (req, res) => {
    try{
          const materijali = await Materijal.findByPk(req.params.id);
          materijali.destroy();
          return res.json(materijali.id);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
 