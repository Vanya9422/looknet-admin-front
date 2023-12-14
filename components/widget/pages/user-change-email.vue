<template lang="pug">
  .edit-field.settings__field
    .edit-field__row
      .edit-field__column.edit-field__column_left
        .edit-field__label.color-gray.p Email
      .edit-field__column.edit-field__column_center
        form-input(
          v-model="value"
          :value="value"
          :name="name"
          :placeholder="placeholder"
          :type="type"
          :error="!notError"
          v-if="edit"
        )
        .edit-field__placeholder.h4(v-else) {{value}}
      .edit-field__column.edit-field__column_right
        .edit-field__nav.mobile-hidden(v-if="edit")
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
    modal-field(:id="modalName" title="Notifications" @save="closeSave" )
      .modal-field__list
        .modal-field__item
          .modal-field__label Email
          form-input.modal-field__input(
            v-model="value"
            :name="name"
            :placeholder="placeholder"
            :type="type"
            :error="!notError"
          )
</template>

<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      placeholder: 'Bari56@mail.ru',
      value: this.user.email,
      type: "email",
      name: "email",
      modalName: 'email',
      notError: true,
      isShow: false,
      oldValue: this.user.email
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.notError = val.length > 2
        if (this.modalName === 'email') this.notError = this.$validateEmail(val)
        if (val === this.oldValue) this.notError = false
        const form = {
          value: val,
          field: 'email'
        }
        this.$axios.$get('/auth/check-exists', {params: form})
            .then(res => {
              this.notError = false
            })
            .finally(() => this.notError = true)
      }
    }
  },
  methods: {
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
      form[this.modalName] = this.value
      if (this.notError && this.value !== this.oldValue) {
        if(this.$validateEmail(this.value)){
          this.changeEmail({email: this.value})
        }else{
          this.notError = false
        }
      } else {
        this.notError = false
      }
    },
    changeEmail(info) {
      let form = {
        id:this.$route.params.id,
        ...info
      }

      this.$axios.$put(`/admin/moderators`, form).then((res) => {
        this.$emit('save')
        this.$emit('edit', false);
        this.edit = false;
      })
    },
  }

}
</script>

<style scoped>

</style>