<template>
  <b-container class="my-container">
    <b-row class="my-row">
      <b-col cols="6">
        <b-container>
          <h4 class="title">Salud de los pilotos</h4>
          <b-row class="my-row">
            <b-col cols="4">
              <h5 class="subtitle">Heart Rate</h5>
            </b-col>
            <b-col cols="8">
              <h3 class="subtitle">Grafic</h3>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <line-chart :chart-data="datacollection"></line-chart>
                <button class="btn-a27" @click="fillData()">Randomize</button>
              </div>
            </b-col>
          </b-row>
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Spo2 </b-col>
            <b-col cols="8" class="my-col"> Grafic</b-col>
          </b-row>
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Body Tempeture </b-col>
            <b-col cols="8" class="my-col"> Grafic</b-col>
          </b-row>
        </b-container>
        <b-container>
          <h4 class="title">Estatus del Ambiente</h4>

          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Presión atmosférica </b-col>
            <b-col cols="8" class="my-col"> Grafic </b-col>
          </b-row>
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Humedad </b-col>
            <b-col cols="8" class="my-col"> Grafic</b-col>
          </b-row>
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Temperatura </b-col>
            <b-col cols="8" class="my-col"> Grafic</b-col>
          </b-row>
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> UV Intensidad </b-col>
            <b-col cols="8" class="my-col"> Grafic</b-col>
          </b-row>
        </b-container>
        <b-container>
          <h4 class="title">Información del Rover</h4>
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Velocidad y fuerza </b-col>
            <b-col cols="8" class="my-col"> Grafic </b-col>
          </b-row>
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Localización GPS </b-col>
            <b-col cols="8" class="my-col"> Grafic</b-col>
          </b-row>
        </b-container>
      </b-col>
      <b-col cols="6" class="my-col">
        <b-container class="my-container"> Video </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LineChart from "../components/LineChart";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#454ade",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
          // {
          //   label: "Data One",
          //   backgroundColor: "#020024",
          //   data: [this.getRandomInt(), this.getRandomInt()],
          // },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (10 - 5 + 1)) + 6;
    },
  },
};
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  display: block;
  font-weight: bold;
  font-size: 24px;
  color: #28313a;
}

.subtitle {
  font-family: "Segoe UI", Roboto;
  font-size: 18px;
  color: #28313a;
  word-spacing: 1px;
  padding-bottom: 15px;
}

body {
  margin: 30px;
}

.my-container {
  border: 1px solid green;
}

.my-row {
  border: 3px solid red;
}

.my-col {
  border: 3px solid blue;
}

.small {
  max-width: 600px;
}

.btn-a27 {
  background-color: transparent;
  border-radius: 10px;
  border: 2px solid #454ade;
  padding: 10px 20px;
  color: #28313a;
}
</style>
