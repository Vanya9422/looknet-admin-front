export default {
  CHANGE_LOCATION(state, city) {
    localStorage.setItem('city', JSON.stringify(city))
    state.location = city
  },
}

