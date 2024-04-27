const express = require("express");
const { sequelize, StavkaNarudzbine, Narudzbina} = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;

route.get("/", async (req, res) => {
    try{
          const narudzbine = await Narudzbina.findAll();
          return res.json(narudzbine);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

route.get("/:id", async (req, res) => {
    try{
          const narudzbine = await Narudzbina.findByPk(req.params.id);
          return res.json(narudzbine);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
route.post("/", async (req, res) => {
    try{
          const novi = await Narudzbina.create(req.body);
          return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
  
route.put("/:id", async (req, res) => {
    try{
          const narudzbine = await Narudzbina.findByPk(req.params.id);
          narudzbine.vreme_narucivanja = req.body.vreme_narucivanja;
          narudzbine.zakazano_vreme = req.body.zakazano_vreme;
          narudzbine.status = req.body.status;
          narudzbine.adresa = req.body.adresa;
          narudzbine.telefon = req.body.telefon;
          narudzbine.ime_prezime = req.body.ime_prezime;
          narudzbine.save();
          return res.json(narudzbine);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
 
route.delete("/:id", async (req, res) => {
    try{
          const narudzbine = await Narudzbina.findByPk(req.params.id);
          narudzbine.destroy();
          return res.json(narudzbine.id);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
    route.use(authToken);
 });
 