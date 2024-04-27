<template>
    <div id="app" class="text-center">
      <Header v-bind:title="headerTitle" />
      <b-alert :variant="statusnaPorukaTip" :show="statusnaPoruka!=null">{{ statusnaPoruka }}</b-alert>
      <div>
            <b-container fluid>
                <b-row>
                    <b-col sm="3">
                        <label for="naziv">Naziv</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input id="naziv" :state="validanNaziv" v-model="forma.naziv"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="3">
                        <label>Opis</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input id="opis" :state="validanOpis" v-model="forma.opis"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="3">
                        <label for="kategorija">Kategorija</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-select id="kategorija" v-model="forma.kategorija" :options="kategorije" required></b-form-select>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="3">
                        <label>Opisite koje podatke treba promeniti ili dodati</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-textarea id="textarea" :state="validnaPrijava" v-model="forma.prijava" rows="4"></b-form-textarea>
                    </b-col>
                </b-row>
            </b-container>
            <b-button @click="posalji()" variant="primary">Posalji</b-button>
        </div>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import KolekcijaList from '@/components/KolekcijaList.vue'
  
  
  export default {
    name: 'App',
    components: {
      Header, KolekcijaList
    },
    data(){
      return{
        headerTitle: "Prijava promena podataka",
        statusnaPoruka: null,
        statusnaPorukaTip: null,
        forma: {
            naziv: null,
            opis: null,
            kategorija: null,
            promena: null
        },
        kategorije: [
            { text: "Majica", value: 1 },
            { text: "Dukserica", value: 2 }
        ]
      }
    },
    methods:{
        posalji(){
        if(this.validanNaziv && this.validanOpis && this.validnaPrijava){
            fetch("http://localhost:9000/kolekcija", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.forma)
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                if(res.error){
                    this.statusnaPoruka = res.error;
                    this.statusnaPorukaTip = 'danger';
                } else {
                    this.statusnaPoruka = "Prijava za promenu podataka je uspesno poslata";
                    this.statusnaPorukaTip = 'success';
                }
            });
        }
        else{
            return;
        }
    },
    },
    computed: {
        validanNaziv(){
            if(this.forma.naziv == null) return null;
            else if(this.forma.naziv.length > 2) return true
            else return false;
        },
        validanOpis(){
            if(this.forma.opis == null) return null;
            else if(this.forma.opis.length > 2) return true
            else return false;
        },
        validnaPrijava(){
            if(this.forma.prijava == null) return null;
            else if(this.forma.prijava.length > 2) return true
            else return false;
        }
    },
  }
  
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');
  #app {
    font-family: 'Gloock', sans-serif;
    text-align: center;
    color: #404040;
    background-color: #ffffff;
    padding: 20px;
  }
  
  .button-container {
    margin-top: 20px;
  }
  
  .button-container button {
    background-color: #1abc9c;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
  }
  
  .button-container button:hover {
    background-color: #138d75;
  }
  
  .list-container {
    margin-top: 20px;
  }
  
  .loading-message {
    color: #ecf0f1;
    font-size: 18px;
  }
  </style>
  