import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router"
import MainComponent from "./pages/index.vue"
import AboutComponent from "./pages/about.vue"
import miComponent from "./pages/mi.vue"

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

createApp(App).use(router).mount("#app")