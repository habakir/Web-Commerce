import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    narudzbine: [],
    kolekcije: [],
    celaKolekcijaIDs: [],
    token: ''
  },
  getters: {
  },
  mutations: {
    addNarudzbine(state, narudzbine){
      state.narudzbine = narudzbine;
    },
    addKolekcije(state, kolekcije){
      state.kolekcije[kolekcije.id] = kolekcije;
    },
    addCelaKolekcijaIDs(state, niz){
      state.celaKolekcijaIDs = niz;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

  },
  actions: {
    async fetchNarudzbine({commit}){
      fetch(`http://localhost:9000/narudzbina`)
        .then( res=>res.json() )
          .then( data => commit('addNarudzbine', data) );
    },

    async getKolekcija({commit, state}, kolekcijaID){
      return new Promise((resolve, reject)=>{
        if(state.kolekcije[kolekcijaID]){
          resolve(state.kolekcije[kolekcijaID]);
        }
        else{
          fetch(`http://localhost:9000/kolekcija/${kolekcijaID}`)
            .then( res=>res.json() )
              .then( data=> {
                commit('addKolekcije', data)
                resolve(data);
              });
          }
      });
    },

    async fetchSveKolekcije({commit}){
      fetch("http://localhost:9000/kolekcija")
        .then( res=>res.json() )
          .then( data=> commit('addCelaKolekcijaIDs', data) );
    },

    register({ commit }, obj) {
      fetch('http://127.0.0.1:9001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( data => commit('setToken', data.token) );
    },
    
    login({ commit }, obj) {
      fetch('http://127.0.0.1:9001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( data => {
        if (data.msg) {
          alert(data.msg);
        } else {
          commit('setToken', data.token)
        }
      });
    },
},
  modules: {
  }
})
