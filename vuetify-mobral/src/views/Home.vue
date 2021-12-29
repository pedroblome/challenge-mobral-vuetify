<template>
  <v-app>
    <v-main>
      <div class="home">
        <v-img
          alt="Solinftec logo"
          src="../assets/Solinftec - Bold Outline Cinza.png"
          width="50%"
        ></v-img>
      </div>

      <v-card elevation="11" max-width="1000" class="my-15 pa-6">
        <v-card-title><h1>Sobre o projeto Mobral 2021</h1></v-card-title>
        <v-spacer></v-spacer>
        <v-card-subtitle>
          <h2>Objetivo</h2>
        </v-card-subtitle>
        <v-spacer></v-spacer>
        <v-card-text class="font-size:40px">
          <p>
            O objetivo do projeto é construir uma aplicação
            <strong>SPA</strong> utilizando Vue e Vuetify, e consumir diversas
            APIs com base nos estudos realizados na última semana.
          </p>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Home",
};
</script>
