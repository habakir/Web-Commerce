<template>
    <div>
         <KolekcijaSingle v-for="kolekcija in kolekcije" :key="kolekcija.id" :kolekcija="kolekcija"/>
     </div>
 </template>
     
     <script>
     import KolekcijaSingle from '@/components/KolekcijaSingle.vue';
     import { mapActions, mapState } from 'vuex';
     export default {
         name: 'KolekcijaList',
         components: {
             KolekcijaSingle
         },
         data() {
             return {
                 kolekcije: []
             }
         },
         props:{
             kolekcijaIDs: Array
         },
         methods: {
            ...mapActions([
                'getKolekcija'
            ]),
            addKeyToKolekcije(kolekcija) {
                const existingKolekcija = this.kolekcije.find((existing) => existing.id === kolekcija.id);
                if(!existingKolekcija){
                    this.kolekcije.push(kolekcija);
                }
            }
        },

         mounted() {
            this.kolekcijaIDs.forEach(obj => {
                this.getKolekcija(obj.id).then((kolekcija) => this.addKeyToKolekcije(kolekcija));
            });
         },
         watch: {
             kolekcijaIDs(nVal) {
                 this.kolekcija = [];
                 nVal.map( obj => {
                    this.getKolekcija(obj.id).then((kolekcija) => this.addKeyToKolekcije(kolekcija));
                 });
             }
         }
     }
 
 
 
     
     </script>
     
     <!-- Add "scoped" attribute to limit CSS to this component only -->
     <style scoped>
     .header{
       font-family: 'Gloock', serif;
       text-align: center;
     }
     </style>
     
     
     