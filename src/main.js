import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire"; // Added to make vuefire work
import { auth } from "./firebaseConfig.js"; // for authentication
import { BootstrapVue, IconsPlugin, TabsPlugin, ProgressPlugin, LayoutPlugin, FormDatepickerPlugin } from 'bootstrap-vue'

import "@/assets/global.css";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(firestorePlugin); // added to make vuefire work
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(TabsPlugin);
Vue.use(ProgressPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormDatepickerPlugin)

// eslint-disable-next-line no-unused-vars
export const loadedGoogleMapsAPI = new Promise((resolve, reject) => {
  window['GoogleMapsInit'] = resolve
  let GoogleMap = document.createElement('script')
  GoogleMap.setAttribute('src',
  `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&callback=GoogleMapsInit&region=US&libraries=places`)

  document.body.appendChild(GoogleMap)
})

let app; // for authentication
auth.onAuthStateChanged(() => {
  // for authentication
  if (!app) {
    // for authentication
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
