<template>
  <div class="orders">
    <Header title="Trenutne narudzbine" />
    <div class="table-container">
      <b-table striped hover :items="this.narudzbine" :fields="fields" :per-page="perPage" :current-page="currentPage" id="tabelaNarudzbine">
        <template #cell(vreme_narucivanja)="data">
          {{ formatDate(data.value) }}
        </template>
        <template #cell(zakazano_vreme)="data">
          {{ formatDate(data.value) }}
        </template>
      </b-table>
    </div>
    <b-pagination v-model="currentPage" :total-rows="this.narudzbine.length" :per-page="perPage" aria-controls="tabelaNarudzbine"></b-pagination>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'narudzbine',
  components: {
    Header,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: 'ime_prezime',
          label: 'Ime i Prezime',
        },
        {
          key: 'telefon',
          label: 'Telefon',
        },
        {
          key: 'adresa',
          label: 'Adresa',
        },
        {
          key: 'vreme_narucivanja',
          label: 'Vreme narucivanja',
        },
        {
          key: 'zakazano_vreme',
          label: 'Zakazano vreme',
        },
        {
          key: 'status',
          label: 'Status',
        },
      ],
    };
  },
  mounted(){
    this.$store.dispatch('fetchNarudzbine');
    if (localStorage.token) {
        this.setToken(localStorage.token);
      }

  },
  computed: {
    ...mapState([
      'narudzbine'
    ]),
    ...mapState([
        'token'
    ])
  },
  methods: {
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    ...mapMutations([
        'removeToken',
        'setToken'
      ]),
    logout() {
        this.removeToken();
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
.orders {
  text-align: center;
  padding: 20px;
}

.table-container {
  max-width: 800px;
  margin: 20px auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.loading-message {
  font-size: 18px;
  margin-top: 20px;
  color: #3498db;
}

.b-table {
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>
