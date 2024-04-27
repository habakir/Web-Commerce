<template>
    <router-link :to="{ name:'kolekcija', params: {id:kolekcija.id}}">
      <div class="kolekcija">
        <img :src="getImagePath(kolekcija.id)" alt="Kolekcija Image" />
        <h3>{{ kolekcija.naziv }}</h3>
      </div>
    </router-link>
  </template>
    
<script>
    export default {
        name:'KolekcijaSingle',  
        props: {
            kolekcija: Object
        },
        methods:{
            kliknutaKolekcija(id){
                this.$router.push({ name:'Kolekcija', params:{id:id}});
            },
            getImagePath(id) {
                return require(`@/assets/images/model${id}.png`);
            },
        }
    }
</script>
    
<style scoped>
.kolekcija {
  width: 300px;
  margin: 40px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  color: #404040;
  text-align: center;
  display: inline-block;
}

.kolekcija img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.kolekcija h3 {
  margin-top: 10px;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>