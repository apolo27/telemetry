<template>
  <b-container class="my-container">
    <b-row class="my-row">
      <b-col cols="6" class="my-col">
        <b-container>
          Salud de los pilotos
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Heart Rate </b-col>
            <b-col cols="8" class="my-col"> Grafic </b-col>
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
          Estatus del Ambiente
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
          Información del Rover
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Velocidad y fuerza </b-col>
            <b-col cols="8" class="my-col"> Grafic </b-col>
          </b-row>
          <b-row class="my-row">
            <b-col cols="4" class="my-col"> Localización GPS </b-col>
            <b-col cols="8" class="my-col"> Grafic</b-col>
          </b-row>
          <!-- <b-row class="my-row">
            <b-col cols="4" class="my-col"> Body Tempeture </b-col>
            <b-col cols="8" class="my-col"> Grafic</b-col>
          </b-row> -->
        </b-container>
      </b-col>
      <b-col cols="6" class="my-col">
        <b-container class="my-container"> Video </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      barChartData: {
        labels: [
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12",
          "2020-01",
          "2020-02",
          "2020-03",
          "2020-04",
          "2020-05",
        ],
        datasets: [
          {
            label: "Visits",
            data: [10, 15, 20, 30, 40, 50, 60, 70, 34, 45, 11, 78, 45],
            backgroundColor: "#003f5c",
          },
          {
            label: "Pages Views",
            data: [30, 24, 57, 23, 68, 72, 25, 64, 133, 143, 165, 33, 56],
            backgroundColor: "#2f4b7c",
          },
          {
            label: "Users",
            data: [45, 65, 30, 53, 34, 35, 26, 37, 34, 45, 67, 87, 98],
            backgroundColor: "#665191",
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Google analytics data",
          fontSize: 24,
          fontColor: "#6b7280",
        },
        tooltips: {
          backgroundColor: "#17BF62",
        },
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
      },
    };
  },
};
</script>

<style>
/* .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
} */

/* .title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
} */

/* .subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
} */

/* .links {
  padding-top: 15px;
} */

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
</style>
