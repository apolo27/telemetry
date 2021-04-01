import Vue from 'vue'

const components = {
  BarChart: () => import('../..\\components\\BarChart.js' /* webpackChunkName: "components/bar-chart" */).then(c => c.default || c),
  CargarMapa: () => import('../..\\components\\CargarMapa.vue' /* webpackChunkName: "components/cargar-mapa" */).then(c => c.default || c),
  LineChart: () => import('../..\\components\\LineChart.js' /* webpackChunkName: "components/line-chart" */).then(c => c.default || c),
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c),
  Mapa: () => import('../..\\components\\Mapa.vue' /* webpackChunkName: "components/mapa" */).then(c => c.default || c),
  Marcadores: () => import('../..\\components\\Marcadores.vue' /* webpackChunkName: "components/marcadores" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
