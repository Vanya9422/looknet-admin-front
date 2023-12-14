<template lang="pug">
  client-only
    gmap-map(
      :zoom="14"
      :center="{lat: +lat,lng: +lng}"
      map-type-id='terrain'
      class='map' id='map'
      :options="mapOptions"
    )
      gmap-marker(:position="{lat: +lat,lng: +lng}" :icon="require('@/assets/img/mapIcon.png')")
</template>

<script>

export default {
  props: {
    lng: {
      type: [String, Number]
    },
    lat: {
      type: [String, Number]
    } 
  },
  data() {
    return {
      mapOptions: {
        zoom: 16,
        disableDefaultUI: true,
        styles:  []
      },
    }
  },
}
</script>

