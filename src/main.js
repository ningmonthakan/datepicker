import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueNumeralFilterInstaller from 'vue-numeral-filter'
import VueSweetalert2 from 'vue-sweetalert2';
import ZoomOnHover from "vue-zoom-on-hover"
import VueZoomer from 'vue-zoomer'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' })


Vue.use(ZoomOnHover)
Vue.use(VueZoomer)
Vue.use(VueSweetalert2)

// import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
Vue.use(CarbonComponentsVue);

import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import VuePdfApp from "vue-pdf-app";
Vue.component("vue-pdf-app", VuePdfApp);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


import VCalendar from 'v-calendar';
Vue.use(VCalendar, {
  componentPrefix: 'vc', 
});
