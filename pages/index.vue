<template>
  <b-container class="my-container">
    <b-row class="my-row">
      <b-col cols="6">
        <b-container>
          <h4 class="title">Salud de los pilotos</h4>
          <b-row>
            <b-col cols="4">
              <h5 class="subtitle">Heart Rate</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-heart">76</p>
              </div>
            </b-col>
            <b-col cols="8">
              <h3 class="subtitle">Grafic</h3>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <line-chart :chart-data="datacollection"></line-chart>
                <button class="btn-a27 btn-color-heart" @click="fillData()">
                  Randomize
                </button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">
              <h5 class="subtitle">Spo2</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-spo2">{{ dataSpo2 }}</p>
              </div>
            </b-col>
            <b-col cols="8">
              <h3 class="subtitle">Grafic</h3>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <line-chart :chart-data="dataSpo2G"></line-chart>
                <button class="btn-a27 btn-color-spo2" @click="fillDataSpo2G()">
                  Randomize
                </button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">
              <h5 class="subtitle">Body Tempeture</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-body-t">{{ dataBodyTemp }}</p>
              </div>
            </b-col>
            <b-col cols="8">
              <h3 class="subtitle">Grafic</h3>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <line-chart :chart-data="dataBodyTempG"></line-chart>
                <button
                  class="btn-a27 btn-color-body-t"
                  @click="fillDataBodyTempG()"
                >
                  Randomize
                </button>
              </div>
            </b-col>
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
      dataSpo2: null,
      dataSpo2G: null,
      dataBodyTemp: null,
      dataBodyTempG: null,
    };
  },
  mounted() {
    this.fillData(),
      this.fillDataSpo2(),
      this.fillDataSpo2G(),
      this.fillDataBodyTemp(),
      this.fillDataBodyTempG();
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
    fillDataSpo2G() {
      this.dataSpo2G = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data",
            backgroundColor: "#facf63",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
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
        ],
      };
    },
    fillDataBodyTempG() {
      this.dataBodyTempG = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
          {
            label: "Data",
            backgroundColor: "#f26f8b",
            data: [
              this.getRandomInt(),
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
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (10 - 5 + 1)) + 6;
    },
    fillDataSpo2() {
      this.dataSpo2 = this.getRandomInt();
    },
    fillDataBodyTemp() {
      this.dataBodyTemp = this.getRandomInt();
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
  padding: 10px 20px;
  color: #28313a;
}

.btn-color-heart {
  border: 2px solid #454ade;
}

.btn-color-spo2 {
  border: 2px solid #facf63;
}
.btn-color-body-t {
  border: 2px solid #f26f8b;
}
.value-text {
  text-align: center;
  font-family: "Segoe UI", Roboto;
  font-size: 25px;
  font-weight: bold;
}

.color-heart {
  color: #454ade;
}

.color-spo2 {
  color: #facf63;
}
.color-body-t {
  color: #f26f8b;
}
</style>
