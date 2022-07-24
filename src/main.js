import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

Vue.use(PiniaVuePlugin)
console.log('VITE_APP_INFO:' + import.meta.env.VITE_OUTPUT_DIR)
new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')
