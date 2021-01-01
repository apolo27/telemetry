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
            <b-col cols="4" class="my-col">
              <h5 class="subtitle">UV Intensidad</h5>
            </b-col>
            <b-col cols="8" class="my-col">
              <h3 class="subtitle">Grafic</h3>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <bar-chart :chart-data="dataBarUV" />
              </div>
            </b-col>
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
import BarChart from "../components/BarChart";

export default {
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      datacollection: null,
      dataSpo2: null,
      dataSpo2G: null,
      dataBodyTemp: null,
      dataBodyTempG: null,
      dataBarUV: null,
      barChartOptions: null,
    };
  },
  mounted() {
    this.fillData(),
      this.fillDataSpo2(),
      this.fillDataSpo2G(),
      this.fillDataBodyTemp(),
      this.fillDataBodyTempG(),
      this.fillBarUV(),
      this.fillBarChartOptions();
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
    fillBarUV() {
      this.dataBarUV = {
        labels: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00"],
        datasets: [
          {
            label: "Baja",
            data: [1, 2, 1, 1, 1, 1, 2],
            backgroundColor: "#3EB04B",
          },
          {
            label: "Moderada",
            data: [3, 3, 3, 4, 5, 4, 5, 4],
            backgroundColor: "#EBCE1F",
          },
          {
            label: "Alta",
            data: [6, 7, 8, 6, 7, 8, 6],
            backgroundColor: "#E77716",
          },
          {
            label: "Muy Alta",
            data: [8, 9, 10, 8, 9, 9, 8, 10],
            backgroundColor: "#BF302C",
          },
          {
            label: "Extremadamente alta",
            data: [0, 0, 0, 0, 0, 11, 0, 0],
            backgroundColor: "#7044D4",
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
    fillBarChartOptions() {
      this.barChartOptions = {
        responsive: true,
        legend: {
          display: true,
        },
        // title: {
        //   display: true,
        //   text: "Google analytics data",
        //   fontSize: 24,
        //   fontColor: "#6b7280",
        // },
        // tooltips: {
        //   backgroundColor: "#17BF62",
        // },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      };
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
