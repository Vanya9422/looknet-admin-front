<template lang="pug">
  .check-field__content.check-field__content-phone(:class="{'check-field__content-phone-error' : error || isError}")
    form-select-lang.favorites-ad__select(:disabled="disabled" @search="searchPhones" @input="changeActivePhone" lang  :items="phone" v-model="activePhone" :value="activePhone" noBorder)
    .check-field__phone
      .check-field__phone-code {{activePhone.code}}
      input.check-field__phone-input(type="tel" :disabled="disabled" :placeholder="activePhone.phone"  v-model="myInputModel" v-mask="activePhone.phone")
</template>

<script>
import phoneList from "~/misc/phone.json"
import {isValidPhoneNumber} from "libphonenumber-js";

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myInputModel:  '',
      phone: phoneList,
      activePhone: phoneList[190],
      errorText: '',
      isError: false,
    }
  },
  watch:{
    myInputModel(val){
      if(this.activePhone.phone.length === val.length){
        this.$emit('input', `${this.activePhone.code.substring(1)} ${val}`)
        this.isError=false
      }else{
        this.isError=true
      }
    }
  },
  methods: {
    searchPhones(val) {
      if (val === '') {
        this.phone = phoneList
      } else {
        const phone = []
        this.phone.forEach(item => {
          const reg = new RegExp(val, 'gi');
          if (reg.test(item.name) || reg.test(item.code)) phone.push(item)
        })
        this.phone = phone
      }
    },
    changeActivePhone(val) {
      this.myInputModel = ''
      this.activePhone = val
    }
  }
}
</script>