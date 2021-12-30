<template>
  <div class="Home">
    <v-app>
      <v-main class="bg">
        <v-container>
          <v-card width="500" class="ma-auto mt-14">
            <v-card-title>
              <h1>Busque um Herói!</h1>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="inputHeroi" label="Nome do Herói">
                  <v-btn @click="buscarHeroi" slot="append" class="blue--text">
                    <v-icon>mdi-account-search</v-icon>
                  </v-btn>
                </v-text-field>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>
        <v-container fluid grid-list-xl>
          <v-layout wrap class="ma-auto mx-16">
            <v-card class="ma-5" width="300" v-for="(heroi,index) in results" :key="index">
              <v-card-title>{{ heroi.name }}</v-card-title>
              <v-card-text>
                <v-img :src="heroi.image['url']"></v-img>
                Nome: {{ heroi.biography["full-name"] }}
                <hr />
                Gender: {{ heroi.appearance["gender"] }}
                <br />
                Race: {{ heroi.appearance["race"] }}
                <br />
                Weight: {{ heroi.appearance["weight"] }}
                <br />
                Height: {{ heroi.appearance["height"] }}
                <br />
                Eye color: {{ heroi.appearance["eye-color"] }}
                <br />
                Hair color: {{ heroi.appearance["hair-color"] }}
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
    inputHeroi: "",
    results: []
  }),

  name: "Eduardo",
  methods: {
    async buscarHeroi() {
      await axios.get('https://superheroapi.com/api/1367914493661640/search/' + this.inputHeroi).then(response => {
        this.results = response.data.results;
        console.log(this.results)
      })
    }
  }
}
</script>

<style scope>
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: url("https://t8j5n5j3.rocketcdn.me/wp-content/uploads/2020/07/liga-da-justica-historia-por-tras-do-principal-grupo-de-heroi-da-dc-1024x528.jpg");
  background-size: cover;
  background-color: red;
  transform: scale(1.1);
}
</style>