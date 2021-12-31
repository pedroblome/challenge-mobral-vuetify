<template>
  <div class="Search">
    <v-app>
      <v-main class="bg">
        <v-container>
          <v-card width="500" class="ma-auto mt-14">
            <v-card-title>
              <h1>Busque imagens oficiais da nasa!</h1>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="inputNasa" label="digite algo para pesquisar">
                  <v-btn @click="buscarNasa" slot="append" class="blue--text">
                    <v-icon>mdi-account-search</v-icon>
                  </v-btn>
                </v-text-field>
              </v-form>
              <div v-if="results">
                <div v-for="(result, index) in results" :key="index">
                  <img v-bind:src="result.links[0].href" />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-container>
        <v-container fluid grid-list-xl>
          <v-layout wrap class="ma-auto mx-16">
            <v-card class="ma-5" width="300" v-for="(nasa,index) in results" :key="index">
              <v-card-title>{{ nasa.name }}</v-card-title>
              <v-card-text>
                <v-img :src="nasa.image['url']"></v-img>
                
              </v-card-text>
            </v-card>
          </v-layout>
        </v-container>
      </v-main>
      
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    inputNasa: "",
    results: []
  }),

  name: "",
  methods: {
    async buscarNasa() {
      await axios.get('https://images-api.nasa.gov/search?q=' + this.inputNasa).then(response => {
        this.results = response.data.results;
        console.log(this.results)
      })
    }
  }
}
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: url("https://acegif.com/wp-content/gif/outerspace-26.gif");
  background-size: cover;
  background-color: black;
  transform: scale(1.1);
}
</style>