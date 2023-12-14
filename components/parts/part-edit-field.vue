<template lang="pug">
  .edit-field
    .edit-field__row
      .edit-field__column.edit-field__column_left
        .edit-field__label.color-gray.p {{label}}
      .edit-field__column.edit-field__column_center
        form-input(
          :value="newValue"
          v-model="newValue"
          :name="name"
          :placeholder="placeholder"
          :type="type"
          v-if="edit"
          :error=" !notError "
        )
        .edit-field__placeholder.h4(v-else) {{value}}
      .edit-field__column.edit-field__column_right
        .edit-field__nav.mobile-hidden(v-if="edit")
          .edit-field__nav-item
            .edit-field__link.color-gray(@click="closeEdit") Cancel
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="saveEdit") Save
        .edit-field__nav.mobile-hidden(v-else)
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="showEdit") Edit
        .edit-field__nav.mobile-visible
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="$bvModal.show(`${modalName}`)") Edit
    modal-field(:id="modalName" :title="groupName" @save="saveEdit")
      .modal-field__list
        .modal-field__item
          .modal-field__label {{label}}
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
    label: {
      type: String,
      default: 'Label name'
    },
    name: {
      type: String,
      default: 'name'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Alexandr'
    },
    type: {
      type: String,
      default: ''
    },
    modalName: {
      type: String,
      default: ''
    },
    groupName: {
      type: String,
      default: ''
    },
    client: {
      type: Object,
      default: null
    },
    phone: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      oldValue: null,
      newValue: this.value,
      edit: false,
      notError: true,
    }
  },
  watch: {
    newValue(val) {
      this.notError = val.length > 2 && val !== this.oldValue
      if(this.modalName=== 'email'){
        this.notError = this.$validateEmail(val)
      }
      this.$emit('input', val)
    }
  },
  methods: {
    showEdit() {
      this.edit = true;
      this.notError = true;
      this.oldValue = this.value
    },
    closeEdit() {
      this.edit = false;
      this.value = this.oldValue
    },

    saveEdit() {
      console.log(this.client)
      if (!this.client) {
        let form = {
          id: this.$route.params.id
        }
        form[this.modalName] = this.newValue
        if (this.notError) {
          this.$axios.$put(`/admin/moderators`, form).then((res) => {
            this.$emit('save')
            this.edit = false;
          })
        } else {
          this.notError = false
        }
      } else {
        let form = {id: this.client.id}
        form[this.modalName] = this.newValue
        if (this.notError) {
          this.$axios.$put(`/admin/commercial/clients`, form).then((res) => {
            this.$emit('save')
            this.edit = false;
          })
        } else {
          this.notError = false
        }
      }

    },
  }
}
</script>

<style lang="scss">
@import '~/assets/сss/components/edit-field.scss';
</style>