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
            <b-col cols="4">
              <h5 class="subtitle">Oxigen level</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-heart">88</p>
              </div>
            </b-col>
            <b-col cols="4">
              <h5 class="subtitle">Temperature</h5>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <p class="value-text color-heart">88</p>
              </div>
            </b-col>
            <b-col cols="12">
              <h3 class="subtitle">Grafic</h3>
              <div class="small shadow p-3 mb-5 bg-white rounded">
                <line-chart :chart-data="pilotData.pilotDataChart"></line-chart>
                <button class="btn-a27 btn-color-heart" @click="fillData()">
                  Randomize
                </button>
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
import BarChart from "../components/BarChart";
import { db } from '../firebaseMain'

export default {
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      pilotData:{
        lastHeartRate: 0,
        lastOxigenLEvel: 0,
        lastTemperature: 0,
        pilotDataChart: {}
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
      this.pilotData.pilotDataChart = {
        labels: data[0],
        datasets: data[1]
      }
    },

    async getPilotDataFromDB() {

      

      let labels = []
      let dataSets = [{
        label : "Heart Rate",
        backgroundColor : "#454ade",
        data: []
      }];

      await db.once('value').then((snapshot) => {
        const records = snapshot.val();
        for(const recordId of Object.getOwnPropertyNames(records)){
            labels.push(records[recordId]["date"].substr(11, 8));
            dataSets[0].data.push(records[recordId]["pilot"]["heartRate"]);
          }
        });
      
      return [labels, dataSets];
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
