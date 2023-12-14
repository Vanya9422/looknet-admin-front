import Vue from 'vue'
import AuthApi from '~/misc/api/authApi'
import api from '~/misc/api/api'
import supportChat from '~/misc/api/support_chat'

Vue.prototype.$authApi = AuthApi
Vue.prototype.$api = api
Vue.prototype.$supportChat = supportChat;

export default ({ app }, inject) => {
  inject('authApi', AuthApi)
  inject('api', api)
  inject('supportChat', supportChat)
}

Vue.prototype.$galleryList = function (list) {
  if (list && list.length > 0) {
    let array = []
    this.serverGallery = true
    list.forEach(item => {
      array.push(item.original_full_url)
    })
    return array
  }
  return null
}
Vue.prototype.$newDate = function (date) {
  return new Date(date).toLocaleString('en-US', { timeZone: 'America/New_York' })
}
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});