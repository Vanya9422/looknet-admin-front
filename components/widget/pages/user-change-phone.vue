<template lang="pug">
  .edit-field.settings__field
    .edit-field__row
      .edit-field__column.edit-field__column_left
        .edit-field__label.color-gray.p Phone
      .edit-field__column.edit-field__column_center
        .check-field__content.check-field__content-phone(:class="{'with-border':edit}")
          form-select-lang.favorites-ad__select(@search="searchPhones" @input="changeActivePhone" lang :disabled="!edit"  :items="phone" v-model="activePhone" :value="activePhone" noBorder)
          .check-field__phone
            .check-field__phone-code {{activePhone.code}}
            input.check-field__phone-input(type="tel" :placeholder="activePhone.phone" :disabled="!edit" v-model="value" v-mask="activePhone.phone")
      .edit-field__column.edit-field__column_right
        .edit-field__nav.mobile-hidden(v-if="edit")
          modal-confirm(
            :info="{confirmation_auth: this.value}"
            :isShow="isShow" :title="`Confirm your Phone`"
            :repeatTime=repeatTime
            @reset="resetCode"
            @success="successEdit"
            changeUserInfo
          )
          .edit-field__nav-item
            .edit-field__link.color-gray(@click="closeEdit") Cancel
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="closeSave") Save
        .edit-field__nav.mobile-hidden(v-else)
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="showEdit") Edit
        .edit-field__nav.mobile-visible
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="$bvModal.show(`${modalName}`)") Edit
    modal-field(:id="modalName" title="Notifications" @save="closeSave")
      .modal-field__list
        .modal-field__item
          .modal-field__label Phone
        .check-field__content.check-field__content-phone.with-border
          form-select-lang.favorites-ad__select( @search="searchPhones" @input="changeActivePhone" lang  :items="phone" v-model="activePhone" :value="activePhone" noBorder)
          .check-field__phone
            .check-field__phone-code {{activePhone.code}}
            input.check-field__phone-input(type="tel" :placeholder="activePhone.phone"  v-model="value" v-mask="activePhone.phone")
</template>

<script>
import {parsePhoneNumber, isValidPhoneNumber} from 'libphonenumber-js'
import phoneList from "@/misc/phone.json";

export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: {}
    },
    isClient: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      placeholder: 'Bari56@mail.ru',
      value: this.user.phone_view,
      type: "text",
      name: "phone",
      modalName: 'phone',
      notError: true,
      isShow: false,
      oldValue: this.user.phone_view,
      phone: phoneList,
      activePhone: phoneList[190],
      info: {
        confirmation_auth: this.value,
        phone_view: ''
      }
    }
  },
  mounted() {
    this.getActivePhoneItem()
  },
  methods: {
    getActivePhoneItem() {
      if( this.oldValue) {
        let phone = this.oldValue.split(' ')
        // const phoneTrim = phone.pop()
        for (let i = 0; i < phoneList.length; i++) {
          let str = this.phone[i].code.substring(1)
          // console.log({str,phone})
          if (str === phone[0]) {
            console.log(phone)
            this.activePhone = phoneList[i]
            this.value = phone.join(' ').substring(str.length + 1)
            this.oldValue =  phone.join(' ').substring(str.length + 1)
          }
        }
      }

    },
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
      this.activePhone = val
    },
    showEdit() {
      this.$emit('edit', true);
      this.notError = true;
      this.oldValue = this.value
    },
    closeEdit() {
      this.$emit('edit', false);
      this.value = this.oldValue
    },
    closeSave() {
      let form = {}
      form[this.modalName] = `${this.activePhone.code} ${this.value}`
      if (this.notError) {
        const phone = parsePhoneNumber(`${this.activePhone.code} ${this.value}`).number.substring(1)
        this.info = {
          phone: phone.substring(1),
          phone_view: `${this.activePhone.code.substring(1)} ${this.value}`
        }
        console.log(this.info)
        this.changePhone(this.info)
      } else {
        this.notError = false
      }

    },
    changePhone(info) {
      if(!this.isClient){
        let form = {
          id: this.$route.params.id,
          ...info
        }

        this.$axios.$put(`/admin/moderators`, form).then((res) => {
          this.$emit('save')
          this.$emit('edit', false);
        })
      }else{
        let form = {
          id: this.user.id,
          ...info
        }

        this.$axios.$put(`/admin/commercial/clients`, form).then((res) => {
          this.$emit('save')
          this.$emit('edit', false);
        })
      }

    },
  }

}
</script>

<style lang="scss">
.edit-field__column_right {
  z-index: 999;
}

.edit-field__column_center-phone {
  position: relative;
  overflow: visible;

  input:disabled {
    background: #fff;
  }

  .lang-title {
    max-width: 115px !important;
  }

  &__text {
    margin-left: 44px;
    @include large-mobile {
      margin-left: 30px;
    }
  }
}
.edit-field__column .check-field__phone input{
  background: transparent;
}
</style>