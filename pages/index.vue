<template>
  <b-container fluid>
    <b-row class="my-row justify-content-center">
      <h3 class="title pb-2">Apolo 27 - telemetry</h3>
    </b-row>
    <b-row class="my-row">
      <b-col cols="6">
        <b-container>
          <b-row>
            <b-col>
              <div style="text-align: center">
                <h4 class="title">Rover's route</h4>
              </div>
              <div v-if="position.length != 0">
                <!-- <div class="shadow-lg p-3 mb-5 rounded"> -->
                  <Mapa v-bind:position="position" class="mapa" />
                <!-- </div> -->
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <br />
              <div style="text-align: center">
                <h4 class="title">Rover's data</h4>
              </div>
              <!-- style="border: 2px solid white" -->
              <div class="shadow-lg p-1 mb-3" >
                <p class="value-text" style="color: white">Last measured speed:</p>
                <p class="value-text" style="color: white">{{ roverData.lastSpeed }} m/s</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="shadow-lg p-3 mb-5 rounded chartColor">
                <div id="myChartColor">
                  <line-chart
                    :chart-data="roverData.roverSpeedData"
                    :key="roverData.lastSpeed"
                  >
                  </line-chart>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
      <b-col cols="6">
        <b-container>
          <div style="text-align: center">
            <h4 class="title">Pilot's health</h4>
          </div>
          <b-row>
            <b-col cols="6  mb-3">
              <div class="shadow-lg p-1 black rounded">
                <p class="value-text mb-0">Last heart rate:</p>
                <p class="value-text mb-0">{{ pilotData.lastHeartRate }} bpm</p>
              </div>
            </b-col>
            <b-col cols="6  mb-3">
              <div class="shadow-lg p-1 black rounded">
                <p class="value-text mb-0">Last oxygen (SpO2):</p>
                <p class="value-text mb-0">{{ pilotData.lastOxigenLevel }}%</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
            
              <div class="shadow-lg p-3 mb-5 rounded chartColor">
                <div>
                  <line-chart
                    :chart-data="pilotData.heartrate"
                    :key="pilotData.lastHeartRate"
                  ></line-chart>
                </div>
              </div>
            </b-col>

            <b-col cols="6">
              <div class="shadow-lg p-3 mb-5 rounded chartColor">
                <div>
                  <line-chart
                    :chart-data="pilotData.oxigen"
                    :key="pilotData.lastOxigenLevel"
                  ></line-chart>
                </div>
              </div>
            </b-col>

          </b-row>
          <div style="text-align: center">
            <h4 class="title">Enviroment's data</h4>
          </div>
          <b-row>
            <b-col cols="6">
              <div class="shadow-lg p-1 mb-4 background-blue">
                <p class="value-text">Temperature:</p>
                <p class="value-text">{{ envData.lastTemperature }} °C</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="shadow-lg p-1 mb-4 background-red">
                <p class="value-text">Pressure:</p>
                <p class="value-text">{{ envData.lastPressure }} mb</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <div class="shadow-lg p-1 mb-3 background-red">
                <p class="value-text">Humidity:</p>
                <p class="value-text">{{ envData.lastHumidity }} %</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="shadow-lg p-1 mb-3 background-blue">
                <p class="value-text">UV intensity:</p>
                <p class="value-text">{{ envData.lastUv }} mW/cm2</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-3 rounded chartColor">
                <div id="myChartColor">
                  <line-chart
                    :chart-data="envData.temperature"
                    :key="envData.lastTemperature"
                  ></line-chart>
                </div>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-3 rounded chartColor">
                <div id="myChartColor">
                  <line-chart
                    :chart-data="envData.pressure"
                    :key="envData.lastPressure"
                  ></line-chart>
                </div>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-3 rounded chartColor">
                <div id="myChartColor">
                  <line-chart
                    :chart-data="envData.humidity"
                    :key="envData.lastHumidity"
                  ></line-chart>
                </div>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="shadow-lg p-3 mb-3 rounded chartColor">
                <div id="myChartColor">
                  <line-chart
                    :chart-data="envData.uv"
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
        heartrate: {
          labels: [],
          datasets: [
            new dataSet("Heart rate", "#FF0000"),
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        },
        oxigen: {
          labels: [],
          datasets: [
            new dataSet("Oxigen level", "#FFFFFF")
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        }
      },
      envData: {
        lastHumidity: 0,
        lastPressure: 0,
        lastTemperature: 0,
        lastUv: 0,
        temperature: {
          labels: [],
          datasets: [
            new dataSet("Temperature", "#FF0000"),
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        },
        pressure: {
          labels: [],
          datasets: [
            new dataSet("Pressure", "#00FF00"),
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        },
        humidity: {
          labels: [],
          datasets: [
            new dataSet("Humidity", "#0000FF")
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        },
        uv: {
          labels: [],
          datasets: [
            new dataSet("UV", "#FFFF00")
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
          datasets: [new dataSet("Speed", "#ffffff")],
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

      // Cambiando formato de fecha
      const tempDate = new Date(record["time"]);
      record["time"] = tempDate.toLocaleTimeString();
      
      this.populatePilotData(record);
      this.populateEnvData(record);
      this.populateRoverData(record);
    },

    async populateEnvData(record) {      
      // Popular temperatura
      this.envData.temperature.labels.push(record["time"]);

      if (this.envData.temperature.labels.length > 30) {
        this.envData.temperature.labels.splice(0, 1);
      }

      this.envData.temperature.datasets[0].data.push(record["temperature"]);
      if (this.envData.temperature.datasets[0].data.length > 30) {
        this.envData.temperature.datasets[0].data.splice(0, 1);
      }

      // Popular presion
      this.envData.pressure.labels.push(record["time"]);

      if (this.envData.pressure.labels.length > 30) {
        this.envData.pressure.labels.splice(0, 1);
      }

      this.envData.pressure.datasets[0].data.push(record["pressure"]);
      if (this.envData.pressure.datasets[0].data.length > 30) {
        this.envData.pressure.datasets[0].data.splice(0, 1);
      }

      // Popular humedad
      this.envData.humidity.labels.push(record["time"]);

      if (this.envData.humidity.labels.length > 30) {
        this.envData.humidity.labels.splice(0, 1);
      }

      this.envData.humidity.datasets[0].data.push(record["humidity"]);
      if (this.envData.humidity.datasets[0].data.length > 30) {
        this.envData.humidity.datasets[0].data.splice(0, 1);
      }

      // Popular UV
      this.envData.uv.labels.push(record["time"]);

      if (this.envData.uv.labels.length > 30) {
        this.envData.uv.labels.splice(0, 1);
      }

      this.envData.uv.datasets[0].data.push(record["uv_intensity"]);
      if (this.envData.uv.datasets[0].data.length > 30) {
        this.envData.uv.datasets[0].data.splice(0, 1);
      }


      this.envData.lastTemperature = record["temperature"];
      this.envData.lastPressure = record["pressure"];
      this.envData.lastHumidity = record["humidity"];
      this.envData.lastUv = record["uv_intensity"];
    },

    async populateRoverData(record) {

      // // Cambiando formato de fecha
      // const tempDate = new Date(record["time"]);
      // record["time"] = tempDate.toLocaleTimeString();

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

      // // Cambiando formato de fecha
      // const tempDate = new Date(record["time"]);
      // record["time"] = tempDate.toLocaleTimeString()

      // Popular pulso cardiaco
      this.pilotData.heartrate.labels.push(record["time"]);
      
      if (this.pilotData.heartrate.labels.length > 30) {
        this.pilotData.heartrate.labels.splice(0, 1);
      }
      
      this.pilotData.heartrate.datasets[0].data.push(record["heart_rate"]);

      if (this.pilotData.heartrate.datasets[0].data.length > 30) {
        this.pilotData.heartrate.datasets[0].data.splice(0, 1);
      }


      // Popular oxigeno
      this.pilotData.oxigen.labels.push(record["time"]);
      
      if (this.pilotData.oxigen.labels.length > 30) {
        this.pilotData.oxigen.labels.splice(0, 1);
      }
      
      this.pilotData.oxigen.datasets[0].data.push(record["oxygen"]);

      if (this.pilotData.oxigen.datasets[0].data.length > 30) {
        this.pilotData.oxigen.datasets[0].data.splice(0, 1);
      }

      this.pilotData.lastHeartRate = record["heart_rate"];
      this.pilotData.lastOxigenLevel = record["oxygen"] * 100;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap');

*{
  font-family: 'IBM Plex Mono', monospace !important;
}
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
  font-size: 20px;
  margin-bottom: 0px;
  /* font-weight: bold; */
  color: #fafafa;
}

.background-red {
  /* background: #d00d1a; */
  border: 2px solid #d00d1a;
}
.background-orange {
  background: #e77716;
}

.background-green {
  background: #3eb04b;
}

.background-blue {
  /* background: #3064ff; */
  border: 2px solid #3064ff;
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
  background-color: #000;
}
.chartColor {
  background-color: #000;
}
</style>
