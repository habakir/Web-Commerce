<template>
  <div id="app" class="text-center">
    <Header v-bind:title="headerTitle" />
    <div class="list-container">
      <KolekcijaList v-if="celaKolekcijaIDs" :kolekcijaIDs="celaKolekcijaIDs.slice(current * 10, current * 10 + 10)" />
      <p v-else class="loading-message">Lista još nije spremna</p>
    </div>
    <button @click="prev()">Prethodno</button>
    <button @click="next()">Sledece</button>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import KolekcijaList from '@/components/KolekcijaList.vue'
import { mapActions, mapState, mapMutations } from 'vuex';


export default {
  name: 'App',
  components: {
    Header, KolekcijaList
  },
  data(){
    return{
      headerTitle: "Clothing Store",
      current: 0
    }
  },
  methods:{
    ...mapActions([
      'fetchSveKolekcije'
    ]),
    ...mapMutations([
        'removeToken',
        'setToken'
      ]),
      logout() {
        this.removeToken();
    },
    next(){
      if( this.current * 10 < this.celaKolekcijaIDs.length ){
        this.current++;
      }
    },
    prev(){
      if( this.current > 0){
        this.current--;
      }
    }
  },
  computed:{
    ...mapState([
      'celaKolekcijaIDs',
      'token'
    ])
  },
  mounted(){
    this.$store.dispatch('fetchSveKolekcije');
    if (localStorage.token) {
        this.setToken(localStorage.token);
      }
  }

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
