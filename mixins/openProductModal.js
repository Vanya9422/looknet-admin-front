import {mapActions} from "vuex";

export default {
  methods:{
    ...mapActions({
      SET_DETAIL_LIST: 'product/SET_DETAIL_LIST',
      SET_DETAIL_ACTIVE: 'product/SET_DETAIL_ACTIVE',
    }),
    openProductModal(index,array) {
      const list = []
      array.forEach(item => list.push(item.slug))
      this.SET_DETAIL_LIST(list)
      this.SET_DETAIL_ACTIVE(index)
    }
  }
}
