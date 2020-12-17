import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  }
};

// export default {
//   extends: Bar,
//   mounted() {
//     this.renderChart(data, options);
//   }
// };
