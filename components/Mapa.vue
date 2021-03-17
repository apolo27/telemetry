<template>
  <CargarMapa
    :configMapa="configMapa"
    apiKey="AIzaSyDj-B2q6BMV3GxrSQthf3t8XmEASWAG0s0"
  >
 
    <template slot-scope="{ google, map }">
      <Marcadores
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
    </template>
 
  </CargarMapa>
 
</template>
 
<script>
  import CargarMapa from "./CargarMapa";
  import Marcadores from "./Marcadores";
  import { configMapa } from "@/constants/configMapa";
 
  export default {
    props:["position"],

    components: {
      CargarMapa,
      Marcadores
    },
 
    data() {
      return {
        markers: this.position
      };
    },
 
    computed: {
      configMapa() {
        return {
          ...configMapa,
          center: this.mapCenter
        };
      },
 
      mapCenter() {
        return this.markers[0].position;
      }
    }
  };
  
</script>