<template lang="pug">
  b-modal(
  id="modal-another-manager"
  size="users"
  ref="modal-manager"
  modal-class="modal-another-manager"
  body-class="modal-another-manager__body"
  header-class="modal-another-manager__header"
  footer-class="modal-another-manager__footer"
  centered
  @show="openModal"
  :hide-footer="true"
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='close()')
    form(  ref="send-form" )
      h3.h3 {{ title }}
      .modal-another-manager
        .d-flex.align-items-center
          span.no-wrap Manager's name
          form-select-moderator.w-100(@input="(val) => moderator = val" v-model="moderator" :items="moderators"  default)
        button-primary.save-manager__btn(blue @click.prevent.native="sendForm") Save changes

</template>
<script>
  import {mapActions, mapGetters,mapMutations} from "vuex";
  export default {
    props: {
      title: {
        type: String,
        default: 'Sending a request to another manager'
      },
    },
    data(){
      return {
        moderator: null,
        moderators:[],
      }
    },
    computed: {
      ...mapGetters({
        GET_ACTIVE_CONVERSATION_ID: 'support_chat/GET_ACTIVE_CONVERSATION_ID',
      }),
    },
    methods:{
      ...mapMutations({
        DELETE_USER_FROM_SIDEBAR: 'support_chat/DELETE_USER_FROM_SIDEBAR',
        SET_ACTIVE_CONVERSATION_ID: 'support_chat/SET_ACTIVE_CONVERSATION_ID',
        SET_ACTIVE_TICKET_ID: 'support_chat/SET_ACTIVE_TICKET_ID',
        DECREMENT_TICKET_TOTAL: 'support_chat/DECREMENT_TICKET_TOTAL',
      }),
      getResults() {
        this.$axios.$get(this.$supportChat.support.getModerators).then(({data}) => {
          this.moderators = data
        })
      },
      openModal(){
        this.getResults()
      },
      sendForm() {
          const form = this.$refs['send-form'];
          const formData = new FormData(form);
          if (this.moderator){
            formData.append('participant_id',this.moderator.id);
            formData.append('_method', 'PUT');
            this.$axios.$post(this.$supportChat.support.changeModerator+`/${this.GET_ACTIVE_CONVERSATION_ID}/change-moderator`, formData).then(res => {
              this.DELETE_USER_FROM_SIDEBAR(this.GET_ACTIVE_CONVERSATION_ID);
              this.DECREMENT_TICKET_TOTAL();
              this.SET_ACTIVE_CONVERSATION_ID();
              this.SET_ACTIVE_TICKET_ID();
              this.$refs['modal-manager'].hide();
            }).catch(e =>{
              // this.apiError = true
            }).finally(() => {
              // this.loading = false
            })
          }

      }
    }
  }
</script>
<style lang="scss">
  .modal {
    &-content {}

    &-another-manager {
      margin-top: 30rem;
      margin-bottom: 60rem;
    }
  }
</style>