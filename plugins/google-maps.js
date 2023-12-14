import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBsxnXvyCO7GNeyTR_vun1zfJzJC0ktoqY',
    libraries: 'places'
  }
})
