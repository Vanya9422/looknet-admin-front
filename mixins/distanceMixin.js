import {mapGetters} from "vuex";

export default {
  computed:{
    ...mapGetters({
      LOCATION:'location/LOCATION'
    }),
    distance() {
      let productCoordinates = this.coordinates
      let myCoordinates = this.LOCATION
      if (myCoordinates) {
        if(typeof  myCoordinates === 'string')myCoordinates = JSON.parse(myCoordinates)
        let distance = this.getDistance(myCoordinates, productCoordinates)
        distance = distance / 1000
        return distance.toFixed(1)
      } else {
        return '-'
      }

    },
  },
  methods: {
    getDistance(origin, destination) {
      let origin1 = new google.maps.LatLng(origin.latitude, origin.longitude);
      let destination1 = new google.maps.LatLng(destination.latitude, destination.longitude);
      return google.maps.geometry.spherical.computeDistanceBetween(origin1, destination1)
    }
  }
}
