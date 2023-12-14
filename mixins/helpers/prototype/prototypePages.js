import Vue from 'vue'

Vue.prototype.$getMinutes = (duration) => {
  // Hours, minutes and seconds
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

Vue.prototype.$validateEmail = (email) => {
  return String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
Vue.prototype.$validatePhone = (phone) => {
  return String(phone)
      .toLowerCase()
      .match(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,6}$/
      );
};


Vue.prototype.$goRegister = function () {
  this.$router.push('/auth/registration')
}

Vue.prototype.$changeRouteQuery = function (newRoute) {
  const query = {
    ...this.$route.query,
    ...newRoute
  }
  this.$router.push({query})
}

Vue.prototype.$getQuery = function (data) {
  const query = data
  // this.$router.push({query})
  let str = '';
  Object.entries(query).forEach(entry => {
    const [key, value] = entry;
    if (typeof value === 'string') {
      str+= `${key}=${value}&`
    } else{
      value.forEach(item=> str+= `${key}=${item}&`)
    }
  });
  return str
}

Vue.prototype.$getQueryFilter = function (data) {
  const query = data
  let str = '';
  query.forEach(i=>{
    if(i.value !== '' && i.value !== null) {
      str+= `;${i.name}:${i.value}`
    }
  })
  return str.substring(1)
}

export default (context, inject) => {
  inject('goRegister', Vue.prototype.$goRegister)
  inject('getQueryFilter', Vue.prototype.$getQueryFilter)
}