<template>
  <v-app>
    <v-card>
      <!-- NAVEGAÇÃO LATERAL  -->
      <v-navigation-drawer
        expand-on-hover
        dark
        color="#00695C"
        v-model="drawer"
        app
        mini-variant="true"
        mini-variant-width="100"
        permanent
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              ><v-img
                src="../src/assets/logo_central.png"
                width="4 00px"
              ></v-img>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            class="my-5 py-2"
            v-for="(i, index) in integrantes"
            :key="index"
            link
            :to="i.path"
          >
            <v-list-item-icon>
              <!-- <v-icon>{{ item.icon }}</v-icon> -->
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ i.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- HOME DA PÁGINA -->
      <v-main class="mx-auto">
        <router-view></router-view>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    integrantes: [
      { name: "Igor", path: "/igor" },
      { name: "Igor News", path: "/igornews" },
      { name: "Dieni", path: "/dieni" },
      { name: "Eduardo", path: "/eduardo" },
      { name: "João Pedro", path: "/joaopedro" },
      { name: "Iruan", path: "/iruan" },
      { name: "Sobre", path: "/" },
    ],
    groupName: "Desafio Mobral",
    drawer: true,
  }),
};
</script>
