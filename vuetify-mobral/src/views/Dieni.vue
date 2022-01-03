<template>
 
    <v-app>
     
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
                <!-- <div v-for="(result, index) in results" :key="index">
                  <img v-bind:src="result.links[0].href" />
                </div> -->
              </div>
            </v-card-text>
          </v-card>
        </v-container>
        <v-container fluid grid-list-xl>
          <v-layout wrap class="ma-auto mx-16">
            <v-card class="ma-5" width="300" v-for="(nasa,index) in results" :key="index">
              <v-card-title>{{ nasa.name }}</v-card-title>
              <v-card-text>
                <v-img :src="nasa.links[0].href"></v-img>
                
              </v-card-text>
            </v-card>
          </v-layout>
        </v-container>
    </v-app>

</template>

<script>
//import axios from 'axios';
export default {
  data: () => ({
    inputNasa: "",
    results: []
  }),

  name: "",
  methods: {
    async buscarNasa() {
      console.log ("https://images-api.nasa.gov/search?q=" + this.inputNasa)
      /*await axios.get('https://images-api.nasa.gov/search?q=' + this.inputNasa).then(response => {
        this.results = response.data.results;
        console.log(this.results)
        console.log(response)
      })
      const response = await axios.get('https://images-api.nasa.gov/search?q=' + this.inputNasa)
        this.results = response.data.results;
        console.log(this.results)*/
        const result = await fetch (`https://images-api.nasa.gov/search?q=${this.inputNasa}`);
        const json = await result.json();
        this.results = json.collection.items;
        console.log(this.results)
    }
  }
}
</script>

<style scoped>

#app{background:  url("https://acegif.com/wp-content/gif/outerspace-26.gif")
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;}
</style>