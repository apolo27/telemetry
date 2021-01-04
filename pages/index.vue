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
        pilotChartData: {}
      },
    };
  },
  mounted() {
    this.populatePilotData();
  },
  methods: {

    async populatePilotData() {
      var data = await this.getPilotDataFromDB();
      console.log(data);
      this.pilotData.lastHeartRate = data[2].heartRate;
      this.pilotData.lastOxigenLevel = data[2].oxigenLevel;
      this.pilotData.lastTemperature = data[2].temperature;
      this.pilotData.pilotChartData = {
        labels: data[0],
        datasets: data[1],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },

    async getPilotDataFromDB() {

      class dataSet{
        constructor(label, bgColor, dataSet = []){
          this.label = label;
          this.backgroundColor = "rgba(0, 0, 0, 0)"
          this.borderColor = bgColor;
          this.data = dataSet;
        }
      }

      let labels = [];
      let lastVal = {
        heartRate: 0,
        oxigenLevel: 0,
        temperature: 0 
      };

      let dataSets = [
        new dataSet("Heart Rate", "rgba(255, 0, 0, 1)"),
        new dataSet("Oxigen level", "rgba(0, 0, 255, 1)"),
        new dataSet("Temperature", "rgba(0, 255, 0, 1)")];

      await db.once('value').then((snapshot) => {
        const records = snapshot.val();
        for(const recordId of Object.getOwnPropertyNames(records)){
            labels.push(records[recordId]["date"].substr(11, 8));
            dataSets[0].data.push(records[recordId]["pilot"]["heartRate"]);
            dataSets[1].data.push(records[recordId]["pilot"]["oxigeneLevel"]);
            dataSets[2].data.push(records[recordId]["pilot"]["temperature"]);
          }
        lastVal.heartRate = dataSets[0].data[dataSets[0].data.length - 1];
        lastVal.oxigenLevel = dataSets[1].data[dataSets[1].data.length - 1];
        lastVal.temperature = dataSets[2].data[dataSets[2].data.length - 1];
        });
      
      return [labels, dataSets, lastVal];
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