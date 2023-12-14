export default {
  SET_ADVERTISES_STATUS(state, status) {
    state.status = status
  },
  CHANGE_PAGE(state, page) {
    if(page === 1) state.advertises = []
    state.page = page
  },
  CHANGE_TOTAL(state, page) {
    state.total = page
  },
  CHANGE_LAST_PAGE(state, page) {
    state.lastPage = page
  },
  CHANGE_CHECKED_LIST(state, index) {
    if (state.advertises[index].checked === true) {
      state.advertises[index].checked = false
      const getIndex = state.checkedList.findIndex(item => item === state.advertises[index].id)
      state.checkedList.splice(getIndex, 1)
    } else {
      state.advertises[index].checked = true
      state.checkedList.push(state.advertises[index].id)
    }
    state.checkedAll = state.advertises.length === state.checkedList.length
  },
  CHANGE_CHECKED_LIST_ALL(state, flag = false) {
    const checked = []
    state.advertises.forEach(i => {
      i.checked = flag
      if (flag) checked.push(i.id)
    })
    state.checkedList = checked
    state.checkedAll = state.advertises.length === state.checkedList.length
    const checkboxes = document.querySelectorAll('.checkboxs__list input[type="checkbox"]')
    checkboxes.forEach((item, i) => checkboxes[i].checked = flag)
  },
  CHANGE_ADVERTISES(state, advertises) {
    const list = []
    if (advertises.length > 0) {
      advertises.forEach(item => {
        // item.checked = state.checkedAll
        // if (state.checkedAll) state.checkedList.push(advertises.id)
        list.push(item);
      })
    }
    if (state.page === 1) {
      state.advertises = list
      state.checkedList = []
      state.checkedAll = false
    } else state.advertises.push(...list)
  },
  CHANGE_GET_BAN_USER(state, id) {
    const product = state.advertises.find(item => {
      if (id) return item.id === id
      else return item.id === state.checkedList[0]
    })

    state.banUserId = [product.author.id]
  },
  CHANGE_GET_ACTIVE_PRODUCT_ID(state, id) {
    state.activeProductId = state.advertises.findIndex(item => {
      if (id) return item.id === id
      else return item.id === state.checkedList[0]
    })
  },
  CHANGE_BAN_USER(state) {
    for (let i = state.advertises.length - 1; i >= 0; i--) {
      if (state.advertises[i].author.id === state.banUserId[0]) {
        state.advertises.splice(i, 1)
        state.total--
      }
    }
    state.banUserId = null
  },
  CHANGE_BAN_USER_REMOVE(state) {
    state.banUserId = null
  },
  CHANGE_ACTIVE_PRODUCT_ID_REMOVE(state) {
    state.activeProductId = null
  },
  CHANGE_ACTIVE_PRODUCT(state, category) {
    state.advertises[state.activeProductId].category = category
    state.activeProductId = null
  },
  CHANGE_PRODUCT_STATUS(state, {data,productId}) {
    let checkedList = []
    if (data.advertises.length > 0) {
      checkedList.push(...data.advertises)
    } else {
      checkedList.push(productId)
      const getIndex = state.checkedList.findIndex(item => item === productId)
      state.checkedList.splice(getIndex, 1)
    }
    checkedList.forEach(item => {
      let getIndex =  state.advertises.findIndex(i => i.id === item)
      state.advertises.splice(getIndex, 1)
    })
    state.total -= checkedList.length
    state.checkedList = []
    state.checkedAll = false
    state.advertises.forEach(item => item.checked = false)
  }

}

