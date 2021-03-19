<template>
  <b-container class="my-container">
    <b-row class="my-row justify-content-center">
      <h4 class="title" style="padding-bottom: 30px">Telemetry</h4>
    </b-row>
    <b-row class="my-row">
      <b-col cols="6">
        <b-container>
          <b-row>
            <b-col>
              <h4 class="title">Rover's route</h4>
              <div v-if="position.length != 0">
                <div class="shadow-lg p-3 mb-5 rounded">
                  <Mapa v-bind:position="position" class="mapa" />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <br />
              <h4 class="title">Rover's data</h4>
              <div class="shadow-lg p-3 mb-5 background-red rounded">
                <p class="value-text">Speed:</p>
                <p class="value-text">{{ roverData.lastSpeed }} m/s</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="shadow-lg p-3 mb-5 rounded">
                <div id="myChartColor">
                  <line-chart
                    :chart-data="roverData.roverSpeedData"
                    :key="roverData.lastSpeed"
                  ></line-chart>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
      <b-col cols="6">
        <b-container>
          <h4 class="title">Pilot's health</h4>
          <b-row>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-5 background-heart rounded">
                <p class="value-text">Heart rate:</p>
                <p class="value-text">{{ pilotData.lastHeartRate }} bpm</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-5 background-yellow rounded">
                <p class="value-text">Oxygen (SpO2):</p>
                <p class="value-text">{{ pilotData.lastOxigenLevel }}%</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="shadow-lg p-3 mb-5 rounded">
                <div id="myChartColor">
                  <line-chart
                    :chart-data="pilotData.pilotChartData"
                    :key="pilotData.lastOxigenLevel"
                  ></line-chart>
                </div>
              </div>
            </b-col>
          </b-row>
          <h4 class="title">Enviroment's data</h4>
          <b-row>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-5 background-orange rounded">
                <p class="value-text">Temperature:</p>
                <p class="value-text">{{ envData.lastTemperature }} °C</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-5 background-green rounded">
                <p class="value-text">Pressure:</p>
                <p class="value-text">{{ envData.lastPressure }} mb</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-5 background-blue rounded">
                <p class="value-text">Humidity:</p>
                <p class="value-text">{{ envData.lastHumidity }} %</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-5 background-yellow rounded">
                <p class="value-text">UV intensity:</p>
                <p class="value-text">{{ envData.lastUv }} mW/cm2</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="shadow-lg p-3 mb-5 rounded">
                <div id="myChartColor">
                  <line-chart
                    :chart-data="envData.envChartData"
                    :key="envData.lastUv"
                  ></line-chart>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LineChart from "../components/LineChart";
import { db } from "../firebaseMain";
import Mapa from "../components/Mapa";

class dataSet {
  constructor(label, bgColor, dataSet = [], hidden = false) {
    this.label = label;
    this.borderColor = bgColor;
    this.data = dataSet;
    this.hoverBackgroundColor = "#454ade";
    this.hidden = hidden;
  }
}

export default {
  components: {
    Mapa,
    LineChart,
  },
  data() {
    return {
      pilotData: {
        lastHeartRate: 0,
        lastOxigenLevel: 0,
        pilotChartData: {
          labels: [],
          datasets: [
            new dataSet("Heart rate", "#454ade"),
            new dataSet("Oxigen level", "#facf63", [], true),
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            chartArea: {
              backgroundColor: "#facf63",
            },
          },
        },
      },
      envData: {
        lastHumidity: 0,
        lastPressure: 0,
        lastTemperature: 0,
        lastUv: 0,
        envChartData: {
          labels: [],
          datasets: [
            new dataSet("Temperature", "#e77716"),
            new dataSet("Pressure", "#3eb04b", [], true),
            new dataSet("Humidity", "#3064ff", [], true),
            new dataSet("UV", "#facf63", [], true),
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        },
      },
      roverData: {
        lastSpeed: 0,
        roverSpeedData: {
          labels: [],
          datasets: [new dataSet("Speed", "#d00d1a")],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            chartArea: {
              backgroundColor: "#facf63",
            },
          },
        },
      },
      position: [],
      count: 1,
    };
  },
  mounted() {
    db.on("child_added", this.getDataDB);
  },
  methods: {
    async getDataDB(snapshot) {
      let record = snapshot.val();
      this.populatePilotData(record);
      this.populateEnvData(record);
      this.populateRoverData(record);
    },

    async populateEnvData(record) {
      this.envData.envChartData.labels.push(record["time"]);
      if (this.envData.envChartData.labels.length > 30)
        this.envData.envChartData.labels.splice(0, 1);
      this.envData.envChartData.datasets[0].data.push(record["temperature"]);
      if (this.envData.envChartData.datasets[0].data.length > 30)
        this.envData.envChartData.datasets[0].data.splice(0, 1);
      this.envData.envChartData.datasets[1].data.push(record["pressure"]);
      if (this.envData.envChartData.datasets[1].data.length > 30)
        this.envData.envChartData.datasets[1].data.splice(0, 1);
      this.envData.envChartData.datasets[2].data.push(record["humidity"]);
      if (this.envData.envChartData.datasets[2].data.length > 30)
        this.envData.envChartData.datasets[2].data.splice(0, 1);
      this.envData.envChartData.datasets[3].data.push(record["uv_intensity"]);
      if (this.envData.envChartData.datasets[3].data.length > 30)
        this.envData.envChartData.datasets[3].data.splice(0, 1);

      this.envData.lastTemperature = record["temperature"];
      this.envData.lastPressure = record["pressure"];
      this.envData.lastHumidity = record["humidity"] * 100;
      this.envData.lastUv = record["uv_intensity"];
    },

    async populateRoverData(record) {
      this.roverData.roverSpeedData.labels.push(record["time"]);
      if (this.roverData.roverSpeedData.labels.length > 30)
        this.roverData.roverSpeedData.labels.splice(0, 1);
      this.roverData.roverSpeedData.datasets[0].data.push(record["speed"]);
      if (this.roverData.roverSpeedData.datasets[0].data.length > 30)
        this.roverData.roverSpeedData.datasets[0].data.splice(0, 1);
      this.roverData.lastSpeed = record["speed"];
      this.position.push({
        id: this.count.toString(),
        position: {
          lat: record["position"][0],
          lng: record["position"][1],
        },
        title: `Position ${this.count} of rover`,
      });
      this.count++;
    },

    async populatePilotData(record) {
      this.pilotData.pilotChartData.labels.push(record["time"]);
      if (this.pilotData.pilotChartData.labels.length > 30)
        this.pilotData.pilotChartData.labels.splice(0, 1);
      this.pilotData.pilotChartData.datasets[0].data.push(record["heartRate"]);
      if (this.pilotData.pilotChartData.datasets[0].data.length > 30)
        this.pilotData.pilotChartData.datasets[0].data.splice(0, 1);
      this.pilotData.pilotChartData.datasets[1].data.push(record["oxygen"]);
      if (this.pilotData.pilotChartData.datasets[1].data.length > 30)
        this.pilotData.pilotChartData.datasets[1].data.splice(0, 1);
      this.pilotData.lastHeartRate = record["heartRate"];
      this.pilotData.lastOxigenLevel = record["oxygen"] * 100;
    },
  },
};
</script>

<style>
.mapa {
  height: 615px;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  display: block;
  font-weight: bold;
  font-size: 24px;
  color: #fafafa;
}

body {
  margin: 30px;
}

.value-text {
  text-align: center;
  font-family: "Segoe UI", Roboto;
  font-size: 25px;
  font-weight: bold;
  color: #fafafa;
}

.background-red {
  background: #d00d1a;
}
.background-orange {
  background: #e77716;
}

.background-green {
  background: #3eb04b;
}

.background-blue {
  background: #3064ff;
}
.background-heart {
  background: #454ade;
}
.background-yellow {
  background: #facf63;
}
.background-pressure {
  background: #f26f8b;
}

#myChartColor {
  background-color: #323232;
}
</style>