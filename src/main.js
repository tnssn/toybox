import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router"
import MainComponent from "./pages/index.vue"
import AboutComponent from "./pages/about.vue"
import miComponent from "./pages/mi.vue"
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// !Vuetify

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
const mi = { template: '<div>mi</div>'}

const routes = [
  { path: '/', component: MainComponent },
  { path: '/about', component: AboutComponent },
  { path: '/mi', component: miComponent},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Vuetify
const vuetify = createVuetify({
  components,
  directives,
})
// Vuetify

createApp(App).use(vuetify).use(router).mount("#app")