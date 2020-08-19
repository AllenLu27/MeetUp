import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: 'AIzaSyC2GsqeNUjR3ganFEx2sniPznRmdnMczX8',
      authDomain: 'meetup-da675.firebaseapp.com',
      databaseURL: 'https://meetup-da675.firebaseio.com',
      projectId: 'meetup-da675',
      storageBucket: "meetup-da675.appspot.com",
    })
  }
}).$mount('#app')
