export { default as BarChart } from '../..\\components\\BarChart.js'
export { default as CargarMapa } from '../..\\components\\CargarMapa.vue'
export { default as LineChart } from '../..\\components\\LineChart.js'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Mapa } from '../..\\components\\Mapa.vue'
export { default as Marcadores } from '../..\\components\\Marcadores.vue'

export const LazyBarChart = import('../..\\components\\BarChart.js' /* webpackChunkName: "components/bar-chart" */).then(c => c.default || c)
export const LazyCargarMapa = import('../..\\components\\CargarMapa.vue' /* webpackChunkName: "components/cargar-mapa" */).then(c => c.default || c)
export const LazyLineChart = import('../..\\components\\LineChart.js' /* webpackChunkName: "components/line-chart" */).then(c => c.default || c)
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
export const LazyMapa = import('../..\\components\\Mapa.vue' /* webpackChunkName: "components/mapa" */).then(c => c.default || c)
export const LazyMarcadores = import('../..\\components\\Marcadores.vue' /* webpackChunkName: "components/marcadores" */).then(c => c.default || c)
