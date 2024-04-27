<template>
  <div v-if = "kolekcija" class="kolekcija">
    <Header :title="kolekcija.naziv" />
    <div class="info">
      <img :src="getImagePath(kolekcija.id)" alt="Kolekcija Image" />
      <h3>Model</h3>
      <p><strong>{{ kolekcija.naziv }}</strong></p>
      <p><strong> {{ kolekcija.opis }}</strong></p>
      <p><strong>Cena:</strong> {{ kolekcija.cena }} RSD</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'kolekcija',
  components: {
    Header,
  },
  data() {
    return {
      kolekcija: null,
    };
  },
  methods: {
    ...mapActions([
      'getKolekcija'
    ]),
    getImagePath(id) {
      return require(`@/assets/images/model${id}.png`);
    },
    ...mapMutations([
        'removeToken',
        'setToken'
      ]),
      logout() {
        this.removeToken();
      }
  },
  mounted() {
    this.getKolekcija(this.$route.params.id)
      .then( res => {
        this.kolekcija = res;
      });
    if (localStorage.token) {
        this.setToken(localStorage.token);
    }

  },
  computed: {
      ...mapState([
        'token'
      ])
    },

};
</script>

<style scoped>
#app {
  font-family: 'Gloock', sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #f4f4f4;
  padding: 20px;
}

.kolekcija {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
  margin: 20px auto;
  max-width: 600px;
}

.info {
  overflow: auto;
  text-align: center;
}

.kolekcija img {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto;
}

.info h3 {
  color: #3498db;
}

.info p {
  margin: 10px 0;
}

.info p strong {
  font-weight: bold;
  margin-right: 10px;
}
</style>