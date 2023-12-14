<template lang="pug">
  form.chat-form(action="/chat" ref="send-form")
    button-file.chat-form__file(@changeFiles="changeFiles()" accept=".jpeg, .jpg, .png" name="files[]")
    .chat-form__field
      form-textarea.chat-form__textarea(v-model="message" :max="299" @enter="sendMessage"  :key="key" placeholder="Enter your message" small)
      .chat-form__files(v-if="files.length > 0" )
        .chat-form__files-wrap
          .chat-form__files-item(v-for="(file, i) in files" :key="i")
            item-file.chat-form__item-file(
              @delete="deleteItem(i)"
              :img="isImage(file.type) ? file.file : ''"
              :isImage="isImage(file.type)"
              :docName="file.name"
              :docSize="Math.floor(file.size/1000) + ' KB'"
            )
    button.chat-form__send(@click.prevent="sendMessage")
      svg-icon(name="send")
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import inputMultiple from "@/mixins/inputMultiple";

  export default {
    data() {
      return {
        key: 0,
        message: ''
      }
    },
    computed: {
      ...mapGetters({
        GET_ACTIVE_CONVERSATION_ID: 'support_chat/GET_ACTIVE_CONVERSATION_ID',
      }),
    },
    mixins: [inputMultiple],
    methods: {
      ...mapActions({
        SEND_MESSAGE: 'support_chat/SEND_MESSAGE',
      }),
      sendMessage() {
        // let conversationType = '';
        // this.$emit('send');
        const form = this.$refs['send-form'];
        const formData = new FormData(form);
        this.message !== '' ? formData.append('message', this.message) : null;
        formData.append('conversation_type', 'support');

        this.message = '';
        this.key++;



        this.SEND_MESSAGE({data: formData, conversation_id: this.GET_ACTIVE_CONVERSATION_ID})
            .then(res => {
            })
            .catch(err => {
              console.log('eerrr',err);
              if (err.response.status === 422) {
                console.log('err', err.response.data.errors);
              }
            })
            .finally(() => {
              this.deleteItemAll();
            });

      },
      isImage(str) {
        return str.includes('image')
      },
      showFiles() {
        document.querySelector(".chat-form__files").removeAttribute("style");
      }
    }
  }
</script>

<style lang="scss">
  .chat-form {
    position: relative;

    @include large-mobile {
      display: flex;
    }

    &__file {
      position: absolute !important;
      left: 0;
      top: 0;
      z-index: 3;
      width: 50rem !important;
      padding-left: 12rem;

      .button-file {
        &__wrap {
          border: 0;

          svg {
            stroke: #464646;
          }
        }
      }

      @include large-mobile {
        position: relative !important;
        width: 28rem !important;
        min-width: 28rem;
        height: 28rem;
        padding-left: 0;
        margin-top: 10rem;
        margin-right: 10rem;
      }
    }

    &__field {
      @include large-mobile {
        border: 1px solid $light-gray;
        border-radius: 10rem;
        width: calc(100% - 90rem);
      }
    }

    &__textarea {
      position: relative;

      .textarea {
        &__field {
          padding-left: 57rem;
          padding-right: 70rem;
        }
      }

      @include large-mobile {
        margin: -1px;
        .textarea {
          &__field {
            padding: 15rem;
            border: 0;
            background: none;
          }
        }

      }
    }

    &__send {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0;
      height: 60rem;
      width: 65rem;
      border: 0;
      background: none;
      cursor: pointer;
      fill: $blue;

      svg {
        width: 24rem;
        height: 24rem;
      }

      @include large-mobile {
        position: static;
        width: 48rem;
        min-width: 48rem;
        height: 48rem;
        background: $blue;
        border-radius: 15rem;
        fill: #fff;
        margin-left: 5rem;
        svg {
          width: 18rem;
          height: 18rem;
        }
      }
    }

    &__files {
      margin: 10rem -5rem 0 -5rem;
      overflow: hidden;

      &-wrap {
        display: flex;
        padding: 0 5rem;
        overflow-y: hidden;
        overflow-x: auto;
        margin-bottom: -40rem;
        padding-bottom: 40rem;
      }

      &-item {
        width: 100rem;
        flex-shrink: 0;

        &:not(:last-child) {
          margin-right: 10rem;
        }
      }

      @include large-mobile {
        margin: -5rem 10rem 10rem 10rem;
        &-wrap {
          padding-left: 0;
          padding-right: 0;
        }
        &-item {
          width: 78rem;

          &:not(:last-child) {
            margin-right: 6rem;
          }
        }
      }
    }
  }
</style>