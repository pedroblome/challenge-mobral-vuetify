<template>
  <v-card width="900" elevation="11">
    <v-card-title class="justify-center">
      <img width="100" heigth="50" src="../assets/styvioLogo.png" />
      <h1 display="1" class="styvioTitle">Styvio</h1>
    </v-card-title>

    <v-divider inset></v-divider>

    <v-card-text>
      <v-form>
        <v-text-field
          label="Tick name (TSLA)"
          :rules="tickRules"
          hide-details="auto"
          v-model="tickName"
          v-mask="['SSSSX']"
          @keyup="autoTransform"
          prepend-icon="mdi-trending-up"
        ></v-text-field>
        <v-row class="ml-15">
          <v-col>
            <v-checkbox
              v-model="chkprediction"
              label="AI Prediction"
              color="#4DB6AC"
              value="1"
              hide-details
            ></v-checkbox>
          </v-col>

          <v-col>
            <v-checkbox
              v-model="chksentiment"
              label="Sentiment"
              color="#4DB6AC"
              value="1"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-form>

      <v-container class="d-flex justify-center">
        <v-btn
          @click="searchTick"
          elevation="4"
          class="mt-7 mx-auto"
          width="200"
          raised
          rounded
          >Search for {{ tickName }}</v-btn
        >
      </v-container>
      <v-alert v-if="alertChkBox" shaped prominent type="error">{{
        msgBox
      }}</v-alert>
    </v-card-text>
    <v-divider inset></v-divider>

    <!-- RESULTADOS DA BUSCA -->
    <div v-if="resultsShow" class="results">
      <h1 class="mx-5 ma-5">
        Results of {{ fullCompanyName }} ({{ tickNameAPI }})
      </h1>

      <v-container class="mb-5 d-flex flex-column justify-center align-center">
        <!-- CARD DE AI PREDICTION -->
        <v-card
          class="mb-5"
          width="600"
          elevation="7"
          shaped
          dark
          color="#4DB6AC"
          v-show="aiprediction"
        >
          <v-card-title>
            <h2>Prediction of {{ tickNameAPI }}</h2>
          </v-card-title>

          <v-card-text>
            <h3 class="pb-5">Direction : {{ direction }}</h3>
            <h3 class="pb-5">Action : {{ action }}</h3>
            <h3 class="pb-5">Current price : {{ currentPrice }}</h3>
          </v-card-text>
        </v-card>

        <!-- CARD DE SENTIMENT -->
        <v-card
          v-show="sentimentshow"
          width="600"
          elevation="7"
          shaped
          dark
          color="#4DB6AC"
        >
          <v-card-title>
            <h2>Overall Sentiment of {{ tickNameAPI }}</h2>
          </v-card-title>

          <v-card-text>
            <h3 class="pb-5">
              StockTwits Bearish sentiment : {{ twitsBearishSentiment }}%
            </h3>
            <h3 class="pb-5">
              Overall Bullish sentiment : {{ bullishSentiment }} %
            </h3>
            <h3 class="pb-5">
              Overall Bearish sentiment : {{ bearishSentiment }} %
            </h3>
            <h3 class="pb-5">
              Overall Social Rating : {{ overallSocialRating }}
            </h3>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Igor",
  data: () => ({
    tickRules: [
      (v) => !!v || "Tick is required",
      (v) => v.length >= 3 || "Tick must have at least three digits.",
    ],
    token: "5159e599-7d8f-4f0c-81d2-1b22948f733e",
    tickName: "",
    chkprediction: "",
    chksentiment: "",
    fullCompanyName: "",
    tickNameAPI: "",
    alertChkBox: false,
    aiprediction: false,
    sentimentshow: false,
    resultsShow: false,
    msgBox: "",
    // AI PREDICTION VARIABLES
    direction: "",
    action: "",
    currentPrice: "",
    // SENTIMENT VARIABLES
    bullishSentiment: "",
    twitsBullishSentiment: "",
    bearishSentiment: "",
    twitsBearishSentiment: "",
    overallSocialRating: "",
  }),
  methods: {
    autoTransform() {
      this.tickName = this.tickName.toUpperCase();
    },
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

    resetData() {
      this.fullCompanyName = "";
      this.direction = "";
      this.action = "";
      this.currentPrice = "";
      this.twitsBullishSentiment = "";
      this.twitsBearishSentiment = "";
      // OVERALL => RESUMO
      this.bearishSentiment = "";
      this.bullishSentiment = "";
      this.overallSocialRating = "";
      this.sentimentshow = false;
      this.aiprediction = false;
    },

    async searchTick() {
      if (this.chkprediction !== "1" && this.chksentiment !== "1") {
        this.showMessageBoxError(
          "Select at least one of options (AI Prediction) or (Sentiment)"
        );

        return false;
      }

      let urlPrediction = `https://www.styvio.com/apiV2/ai/${this.tickName}/${this.token}`;
      let urlSentiment = `https://www.styvio.com/apiV2/sentiment/${this.tickName}/${this.token}`;
      this.resetData();
      if (this.chkprediction === "1") {
        try {
          const response = await axios.get(urlPrediction);
          console.log(response.status);
          if (response.status === 200) {
            this.tickNameAPI = response.data.ticker;
            this.fullCompanyName = response.data.name;
            this.direction = response.data.predictionData.direction;
            this.action = response.data.predictionData.action;
            this.currentPrice = response.data.predictionData.currentPrice;
            this.aiprediction = true;
            this.resultsShow = true; // Show div results
          } else {
            this.showMessageBoxError(
              "An error has ocurred in get data from Styvio API."
            );
          }
        } catch (e) {
          this.showMessageBoxError(
            "An error has ocurred in get data from Styvio API. Check your connection and try again"
          );
        }
      }
      if (this.chksentiment === "1") {
        try {
          const response = await axios.get(urlSentiment);

          if (response.status === 200) {
            this.tickNameAPI = response.data.ticker;
            this.fullCompanyName = response.data.companyInformation.name;
            this.twitsBullishSentiment = this.formatTwoDecimal(
              response.data.stockTwitsSentiment.percentBullish
            );
            this.twitsBearishSentiment = this.formatTwoDecimal(
              response.data.stockTwitsSentiment.percentBearish
            );
            // OVERALL => RESUMO
            this.bearishSentiment = this.formatTwoDecimal(
              response.data.overallSentiment.totalBearishSentiment
            );
            this.bullishSentiment = this.formatTwoDecimal(
              response.data.overallSentiment.totalBullishSentiment
            );
            this.overallSocialRating =
              response.data.overallSentiment.overallSocialRating;
            this.sentimentshow = true;
            this.resultsShow = true; // Show div results
          } else {
            this.showMessageBoxError(
              "An error has ocurred in get data from Styvio API."
            );
          }
        } catch (e) {
          this.showMessageBoxError(
            "An error has ocurred in get data from Styvio API. Check your connection and try again"
          );
        }
      }
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
