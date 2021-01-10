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
                <p class="value-text color-heart">{{pilotData.lastHeartRate}} bpm</p>
              </div>
            </b-col>
            <b-col cols="4">
              <h5 class="subtitle">Oxigen level</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-heart">{{pilotData.lastOxigenLevel}} mmHg</p>
              </div>
            </b-col>
            <b-col cols="4">
              <h5 class="subtitle">Temperature</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-heart">{{pilotData.lastTemperature}} °C</p>
              </div>
            </b-col>
            <b-col cols="12">
              <h3 class="subtitle">Grafic</h3>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <line-chart :chart-data="pilotData.pilotChartData"></line-chart>
              </div>
            </b-col>
          </b-row>
        </b-container>
        <b-container>
          <h4 class="title">Ambiente</h4>
          <b-row>
            <b-col cols="3">
              <h5 class="subtitle">Humedad</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-heart">{{envData.lastHumidity}}%</p>
              </div>
            </b-col>
            <b-col cols="3">
              <h5 class="subtitle">Presión</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-heart">{{envData.lastPressure}} Pa</p>
              </div>
            </b-col>
            <b-col cols="3">
              <h5 class="subtitle">Temperature</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-heart">{{envData.lastTemperature}} °C</p>
              </div>
            </b-col>
            <b-col cols="3">
              <h5 class="subtitle">UV</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-heart">{{envData.lastuv}} nm</p>
              </div>
            </b-col>
            <b-col cols="12">
              <h3 class="subtitle">Grafic</h3>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <line-chart :chart-data="envData.envChartData"></line-chart>
              </div>
            </b-col>
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
import { db } from '../firebaseMain'

class dataSet{
  constructor(label, bgColor, dataSet = []){
    this.label = label;
    this.backgroundColor = "rgba(0, 0, 0, 0)"
    this.borderColor = bgColor;
    this.data = dataSet;
  }
}

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      pilotData:{
        lastHeartRate: 0,
        lastOxigenLevel: 0,
        lastTemperature: 0,
        braceletBattery: 0,
        pilotChartData: {}
      },
      envData:{
        lastHumidity: 0,
        lastPressure: 0,
        lastTemperature: 0,
        lastuv: 0, 
        envChartData: {}
      },
      roverData:{
        gps: [],
        battery: 0,
        rpm: 0,
      },
    };
  },
  mounted() {
    this.getDataDB();
  },
  methods: {

    async getDataDB(){
      await db.once('value').then((snapshot) => {
        let records = snapshot.val();
        const key = Object.getOwnPropertyNames(records)[0];
        records = records[key];
        const chartLabels = records["time_"];
        this.populatePilotData(records, chartLabels);
        this.populateEnvData(records, chartLabels);
        this.populateRoverData(records, chartLabels);
        });
    },

    async populateEnvData(records, chartLabels){
      this.envData.envChartData = {
        labels: chartLabels,
        datasets: [
          new dataSet("Temperature", "rgba(255, 0, 0, 1)", records["enviroment_temperature"]),
          new dataSet("Pressure", "rgba(0, 0, 255, 1)", records["enviroment_pressure"]),
          new dataSet("Humidity", "rgba(0, 255, 0, 1)", records["enviroment_humidity"]),
          new dataSet("UV", "rgba(102, 51, 153, 1)", records["enviroment_uv"])
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
      this.envData.lastTemperature = records["enviroment_temperature"][records["enviroment_temperature"].length - 1];
      this.envData.lastPressure = records["enviroment_pressure"][records["enviroment_pressure"].length - 1];
      this.envData.lastHumidity = records["enviroment_humidity"][records["enviroment_humidity"].length - 1];
      this.envData.lastuv = records["enviroment_uv"][records["enviroment_uv"].length - 1];
    },
    
    async populateRoverData(records, chartLabels){
      this.roverData.gps = records["rover_gps"][records["rover_gps"].length - 1];
      this.roverData.battery = records["rover_roverBattery"][records["rover_roverBattery"].length - 1];
      this.roverData.rpm = records["rover_rpm"][records["rover_rpm"].length - 1];
    },

    async populatePilotData(records, chartLabels){
      this.pilotData.pilotChartData = {
        labels: chartLabels,
        datasets: [
          new dataSet("Heart rate", "rgba(255, 0, 0, 1)", records["pilot_heartRate"]),
          new dataSet("Oxigen level", "rgba(0, 0, 255, 1)", records["pilot_oxigenLevel"]),
          new dataSet("Temperature", "rgba(0, 255, 0, 1)", records["pilot_temperature"])
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
      this.pilotData.lastHeartRate = records["pilot_heartRate"][records["pilot_heartRate"].length - 1];
      this.pilotData.lastOxigenLevel = records["pilot_oxigenLevel"][records["pilot_oxigenLevel"].length - 1];
      this.pilotData.lastTemperature = records["pilot_temperature"][records["pilot_temperature"].length - 1];
      this.pilotData.braceletBattery = records["pilot_braceletBattery"][records["pilot_braceletBattery"].length - 1];
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
.btn-color-atmospheric-p {
  border: 2px solid #3064ff;
}
.btn-color-humity {
  border: 2px solid #3eb04b;
}
.btn-color-tempeture {
  border: 2px solid #e77716;
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
.color-atmospheric-p {
  color: #3064ff;
}
.color-humity {
  color: #3eb04b;
}
.color-tempeture {
  color: #e77716;
}
</style>