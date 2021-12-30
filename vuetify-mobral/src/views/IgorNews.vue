<template>
  <v-container class="d-flex flex-column align-center justify-content">
    <v-card
      dark
      height="450"
      color="#4DB6AC"
      class="mt-10"
      width="900"
      elevation="11"
    >
      <v-card-title class="justify-center">
        <v-input prepend-icon="mdi-newspaper-variant-multiple">
          <h1>News API</h1>
        </v-input>
      </v-card-title>

      <v-card-subtitle align="center" class="mt-2">
        <h2>
          An public API to locate articles and breaking news around the web
        </h2>
      </v-card-subtitle>

      <v-divider color="white"></v-divider>

      <v-card-text>
        <v-text-field v-model="lblArticle" width="200" label="Search for ...">
        </v-text-field>

        <v-container class="d-flex justify-center">
          <v-radio-group v-model="selectedRadio" row>
            <v-radio label="Mentions yesterday" value="yesterday"></v-radio>
            <v-radio label="From last month" value="lastmonth"></v-radio>
            <v-radio label="Today" value="today"></v-radio>
            <v-radio label="Whatever  " value="all"></v-radio>
          </v-radio-group>
        </v-container>
      </v-card-text>
      <v-container class="d-flex justify-center">
        <v-card-actions>
          <v-btn
            @click="searchArticle"
            width="400"
            height="40"
            color="#00695C"
            rounded
            >Search articles of {{ lblArticle }}</v-btn
          >
        </v-card-actions>
      </v-container>

      <v-divider inset class="ma-auto" color="#00695C"></v-divider>
    </v-card>
    <v-alert
      border="left"
      color="red"
      dense
      prominent
      type="error"
      text
      v-show="alertShow"
      class="mt-5"
      >{{ alertMsg }}</v-alert
    >

    <v-divider v-show="showDataTable" color="black"></v-divider>
    <v-container max-width="500">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        v-if="showDataTable"
        height="300"
        @dblclick:row="testeFunc"
        class="elevation-5 ml-auto my-10"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
        }"
      ></v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Igor",
  data: () => ({
    lblArticle: "",
    selectedRadio: "",
    token: "d56ad51a12604551b3ccfd9facc885d8",
    // ALERTS
    alertShow: false,
    alertMsg: "",
    // ARTICLES
    articles: [],
    // DATATABLE
    headers: [
      {
        text: "Author",
        align: "start",
        value: "name",
      },
      { text: "Title", align: "start", value: "title" },
      { text: "Date", value: "date" },
      { text: "Link", value: "link" },
    ],
    // REGISTROS
    desserts: [],
    showDataTable: false,
  }),
  methods: {
    showMessageBoxError(msg) {
      this.msgBox = msg;
      this.alertChkBox = true;
      setTimeout(() => {
        this.alertChkBox = false;
      }, 2500);
    },

    formatTwoDecimal(number) {
      return parseFloat(number).toFixed(2);
    },

    showMessageError(msg) {
      this.alertShow = true;
      this.alertMsg = msg;
      setTimeout(() => {
        this.alertShow = false;
      }, 3000);
    },

    testeFunc(event, { item }) {
      window.open(item.link, "_blank").focus();
    },

    async getInfos() {
      let url = "";
      this.desserts = [];
      let dt_yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0];
      let dt_lastmonth = new Date(
        new Date().setMonth(new Date().getMonth() - 1)
      )
        .toISOString()
        .split("T")[0];
      let dt_today = new Date().toISOString().split("T")[0];
      switch (this.selectedRadio) {
        case "yesterday":
          url = `https://newsapi.org/v2/everything?q=${this.lblArticle}&from=${dt_yesterday}&to=${dt_yesterday}&sortBy=popularity&apiKey=${this.token}`;
          break;
        case "lastmonth":
          console.log("LAST MONTH : ", dt_lastmonth);
          url = `https://newsapi.org/v2/everything?q=${this.lblArticle}&from=${dt_lastmonth}&apiKey=${this.token}`;
          break;
        case "today":
          url = `https://newsapi.org/v2/everything?q=${this.lblArticle}&from=${dt_today}&sortBy=publishedAt&apiKey=${this.token}`;
          break;
        case "all":
          url = `https://newsapi.org/v2/everything?q=${this.lblArticle}&apiKey=${this.token}`;
          break;
      }
      try {
        const response = await axios.get(url);

        if (response.data.totalResults === 0) {
          this.showMessageError("No results found.");
        } else {
          this.articles = response.data.articles;
          this.showDataTable = true;
          for (let i in this.articles) {
            let actual_article = this.articles[i];
            this.desserts.push({
              name:
                actual_article.author !== null
                  ? actual_article.author.replace("(Unknown)", "")
                  : "No specified",
              title: actual_article.title,
              link: actual_article.url,
              date: actual_article.publishedAt.split("T")[0],
            });
          }
        }
      } catch (e) {
        this.showMessageError("An error has ocurred on connect to server.");
      }
    },

    searchArticle() {
      if (this.selectedRadio === "") {
        this.showMessageError(
          "Please select at least one option of radio buttons"
        );
        return;
      }

      if (this.lblArticle === "") {
        this.showMessageError("Input text must be filled");
        return;
      }

      this.getInfos();
    },
  },
};
</script>

<style scope>
.styvioTitle {
  font-family: "Verdana";
  font-size: 55px;
  color: "#00695C";
}
</style>
