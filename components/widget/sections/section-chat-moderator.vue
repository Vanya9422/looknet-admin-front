<template lang="pug">
  section.chat-moderator
    .chat-moderator__row
      .chat-moderator__column.chat-moderator__column_left(:class="{'d-none' : activeTicketId && !$screen.sd}")
        part-chat-sidebar.chat-moderator__sidebar(
          :list="chatUsersList"
          :title="themeText"
          :isExpectationOrViewed="isExpectationOrViewed"
          :isNew="isNew"
          :isClose="isClose"
          :search="false"
          moderator
          backLink="/support-chat"
          :checkbox="false"
          small
          @fetchMoreData="handleMoreUsers"

          :statText="GET_TICKET_THEME_TITLE"
          :statCounter="GET_TICKET_TOTAL"
        )
      .chat-moderator__column.chat-moderator__column_right(:class="{'d-block' : activeTicketId && !$screen.sd}")
        part-chat-body.chat-moderator__body(
        v-if="activeTicketId || activeConversationId"
        :messages="conversationMessages"
        :isNewOrClose="isNewOrClose"
        :isNew="isNew"
        :appeal="bodyTopData"
        :isExpectationOrViewed="isExpectationOrViewed"
        :active_ticket_id="GET_ACTIVE_TICKET_ID"
        :avatar="getUserAvatar()"
        :name="getUserName()"
        :messageable_id="getMessageableId()"
        :text="getBodyTopTime()"
        @fetchMoreData="handleMoreMessages"
        moderator
        to="/support-chat"
        )
        .not-notification(v-else)
          img(src="~/assets/img/not-notification___chat.png")
          p You have not Notifications
      
</template>

<script>
  import {mapActions, mapGetters,mapMutations} from "vuex";
  export default {
    props: {
      title: {
        type: String,
        default: "Settings"
      },
      sidebarTitle: {
        type: String,
        default: "Advertises"
      },
      blacklist: {
        type: Array,
        default: () => ([])
      },
    },
    data() {
      return {
        defaultUserName: 'Ghost',
      }
    },
    watch:{
      activeConversationId(newVal, oldVal) {
        if (oldVal) {
          this.disconnect(oldVal)
        }
        if (this.APPLY_FLAG === false){
          this.connect()
        }
      },
    },
    computed:{
      ...mapGetters({
        GET_CHAT_USERS_LIST : 'support_chat/GET_CHAT_USERS_LIST',
        GET_TICKET_CONVERSATIONS_USERS_LIST : 'support_chat/GET_TICKET_CONVERSATIONS_USERS_LIST',
        GET_CHAT_USERS_LAST_PAGE : 'support_chat/GET_CHAT_USERS_LAST_PAGE',
        GET_CHAT_USERS_PAGE : 'support_chat/GET_CHAT_USERS_PAGE',
        GET_TICKET_CONVERSATIONS_LAST_PAGE : 'support_chat/GET_TICKET_CONVERSATIONS_LAST_PAGE',
        GET_TICKET_CONVERSATIONS_PAGE : 'support_chat/GET_TICKET_CONVERSATIONS_PAGE',
        GET_CONVERSATIONS_MESSAGES_PAGE : 'support_chat/GET_CONVERSATIONS_MESSAGES_PAGE',
        GET_CONVERSATIONS_MESSAGES_LAST_PAGE : 'support_chat/GET_CONVERSATIONS_MESSAGES_LAST_PAGE',
        GET_ACTIVE_TICKET_ID : 'support_chat/GET_ACTIVE_TICKET_ID',
        GET_ACTIVE_CONVERSATION_ID : 'support_chat/GET_ACTIVE_CONVERSATION_ID',
        CHAT_TOP_USER_DATA : 'support_chat/CHAT_TOP_USER_DATA',
        STATUS_EXPECTATION : 'support_chat/STATUS_EXPECTATION',
        STATUS_VIEWED : 'support_chat/STATUS_VIEWED',
        STATUS_NEW : 'support_chat/STATUS_NEW',
        STATUS_CLOSE : 'support_chat/STATUS_CLOSE',
        GET_TICKET_TOTAL : 'support_chat/GET_TICKET_TOTAL',
        GET_TICKET_THEME_TITLE : 'support_chat/GET_TICKET_THEME_TITLE',
        GET_CONVERSATION_MESSAGES : 'support_chat/GET_CONVERSATION_MESSAGES',
        GET_SWITCHERS : 'support_chat/GET_SWITCHERS',
        APPLY_FLAG : 'support_chat/APPLY_FLAG'
      }),
      themeText(){
        return this.$collect(this.GET_SWITCHERS).where('status',parseInt(this.$route.params.status)).first().text;
      },
      isExpectationOrViewed(){
        return parseInt(this.$route.params.status) === this.STATUS_EXPECTATION || parseInt(this.$route.params.status) === this.STATUS_VIEWED
      },
      isNew(){
        return parseInt(this.$route.params.status) === this.STATUS_NEW
      },
      isClose(){
        return parseInt(this.$route.params.status) === this.STATUS_CLOSE
      },
      isNewOrClose(){
        return parseInt(this.$route.params.status) === this.STATUS_NEW || parseInt(this.$route.params.status) === this.STATUS_CLOSE
      },
      activeTicketId(){
        return this.GET_ACTIVE_TICKET_ID
      },
      activeConversationId(){
        return this.GET_ACTIVE_CONVERSATION_ID
      },
      chatUsersList(){
        if (this.isExpectationOrViewed){
          return this.GET_TICKET_CONVERSATIONS_USERS_LIST
        }
        return this.GET_CHAT_USERS_LIST
      },
      conversationMessages() {
        return this.GET_CONVERSATION_MESSAGES;
      },
      chatUsersPage:{
        get(){
          return this.GET_CHAT_USERS_PAGE
        },
        set(val){
          this.SET_CHAT_USERS_PAGE(val)
        }
      },
      chatUsersLastPage:{
        get(){
          return this.GET_CHAT_USERS_LAST_PAGE
        },
        set(val){

        }
      },
      bodyTopData:{
        get(){
          return this.CHAT_TOP_USER_DATA
        },
        set(val){

        }
      },
      paramThemeId(){
        return this.$route.params.theme
      },
      paramStatus(){
        return this.$route.params.status
      }
    },
    methods: {
      ...mapActions({
        FETCH_CHAT_USERS_LIST : 'support_chat/FETCH_CHAT_USERS_LIST',
        FETCH_CHAT_TICKET_CONVERSATIONS_LIST : 'support_chat/FETCH_CHAT_TICKET_CONVERSATIONS_LIST',
        FETCH_CONVERSATION_MESSAGES : 'support_chat/FETCH_CONVERSATION_MESSAGES'
      }),
      ...mapMutations({
        SET_CHAT_USERS_LIST : 'support_chat/SET_CHAT_USERS_LIST',
        SET_CHAT_USERS_PAGE : 'support_chat/SET_CHAT_USERS_PAGE',
        SET_MESSAGE_TO_LIST : 'support_chat/SET_MESSAGE_TO_LIST',
        SET_ACTIVE_CONVERSATION_ID : 'support_chat/SET_ACTIVE_CONVERSATION_ID',
        SET_ACTIVE_TICKET_ID : 'support_chat/SET_ACTIVE_TICKET_ID',
        SET_TICKET_CONVERSATIONS_PAGE : 'support_chat/SET_TICKET_CONVERSATIONS_PAGE',
        SET_TICKET_CONVERSATIONS_USERS_LIST : 'support_chat/SET_TICKET_CONVERSATIONS_USERS_LIST',
        CHANGE_LIST_FROM_EVENT : 'support_chat/CHANGE_LIST_FROM_EVENT',
        SET_CHAT_CLOSED_STATUS_BY_USER : 'support_chat/SET_CHAT_CLOSED_STATUS_BY_USER',
        SET_APPLY_FLAG : 'support_chat/SET_APPLY_FLAG',
        SET_CHAT_TOP_USER_DATA : 'support_chat/SET_CHAT_TOP_USER_DATA'
      }),
      handleMoreUsers($state) {
        if (this.isExpectationOrViewed){

          if (this.GET_TICKET_CONVERSATIONS_PAGE > this.GET_TICKET_CONVERSATIONS_LAST_PAGE) {return}

          this.FETCH_CHAT_TICKET_CONVERSATIONS_LIST({theme_id:this.paramThemeId,ticket_status:this.paramStatus})
              .then(loadState => {
                if (loadState) $state.loaded();
                else $state.complete()
              });
        }else{

          if (this.chatUsersPage > this.chatUsersLastPage) {return}

          this.FETCH_CHAT_USERS_LIST({theme_id:this.paramThemeId,status:this.paramStatus})
              .then(loadState => {
                if (loadState) $state.loaded();
                else $state.complete()
              });
        }
      },
      handleMoreMessages($state){

        if (this.isExpectationOrViewed){
          if (this.GET_CONVERSATIONS_MESSAGES_PAGE > this.GET_CONVERSATIONS_MESSAGES_LAST_PAGE) {return}

          this.FETCH_CONVERSATION_MESSAGES(this.activeConversationId)
              .then(loadState => {
                if (loadState) $state.loaded();
                else $state.complete()
              });
        }
      },
      getUserName(){
        if (this.isNew && this.bodyTopData.user) {
          return this.bodyTopData.user.first_name
        }else if (this.isNew && !this.bodyTopData.user) {
          return this.defaultUserName
        }

        if (this.isClose && this.bodyTopData.user) {
          return this.bodyTopData.user.first_name
        }else if (this.isClose && !this.bodyTopData.user){
          return this.defaultUserName
        }

        return this.bodyTopData.participants ? this.bodyTopData.participants.messageable.first_name : ''
      },
      getUserAvatar(){
        if (this.isNew && this.bodyTopData.user) {
          return this.bodyTopData.user.avatar ? this.bodyTopData.user.avatar.original_full_url : ''
        }else if (this.isNew && !this.bodyTopData.user) {
          return '';
        }

        if (this.isClose && this.bodyTopData.user) {
          return this.bodyTopData.user.avatar ? this.bodyTopData.user.avatar.original_full_url : ''
        }else if (this.isClose && !this.bodyTopData.user){
          return '';
        }

        return this.bodyTopData.participants && this.bodyTopData.participants.messageable.avatar ? this.bodyTopData.participants.messageable.avatar.original_full_url : '';
      },
      getBodyTopTime(){
        if (this.isNewOrClose){
          return 'Was ' + this.bodyTopData.created_time_ago + " ago"
        }

        return this.bodyTopData.last_message ? this.bodyTopData.last_message.created_at : '';
      },
      getMessageableId(){
        if (this.isNew && this.bodyTopData.user) {
          return this.bodyTopData.user.id
        }else if (this.isNew && !this.bodyTopData.user) {
          return 0;
        }

        if (this.isClose && this.bodyTopData.user) {
          return this.bodyTopData.user.id;
        }else if (this.isClose && !this.bodyTopData.user){
          return 0;
        }

        return this.bodyTopData.participants ? this.bodyTopData.participants.messageable_id : 0;
      },
      connect(){
        if (this.activeConversationId) {
          this.$echo.private('send-message.' + this.activeConversationId)
              .listen('.private-send-message', (res) => {
                console.log('message',res);
                this.SET_MESSAGE_TO_LIST(res.message);
                setTimeout(function () {
                  let lastChild = document.querySelector('.chat-body__container-wrap');
                  lastChild.scrollTop = lastChild.scrollHeight;
                },200);
              });
        }
      },
      disconnect(old_active_conversation_id){
        this.$echo.leave('send-message.' + old_active_conversation_id)
      }
    },
    beforeDestroy(){
      this.disconnect(this.activeConversationId);
      this.chatUsersPage = 1;
      this.SET_CHAT_USERS_LIST({data:[]});
      if (!this.APPLY_FLAG){
        this.SET_TICKET_CONVERSATIONS_PAGE();
        this.SET_TICKET_CONVERSATIONS_USERS_LIST({data:[]});
        this.SET_ACTIVE_CONVERSATION_ID();
        this.SET_ACTIVE_TICKET_ID();
        this.SET_CHAT_TOP_USER_DATA([]);
      }
      this.SET_APPLY_FLAG();

      this.$echo.leave('chat-conversation-updated.' + this.$auth.user.id);
    },
    created(){
      if (!this.isNew && this.$auth.loggedIn){
        this.$echo.private('chat-conversation-updated.' + this.$auth.user.id)
            .listen('.private-chat-conversation-updated', (res) => {
              console.log('start', res);
              this.SET_CHAT_CLOSED_STATUS_BY_USER(res);
              this.CHANGE_LIST_FROM_EVENT(res);
              // this.CHANGE_SIDEBAR_WHEN_SEND_MESSAGE(res);
            })
      }
      this.connect();
    }
  }
</script>

<style lang="scss">
  .chat-moderator {
    position: relative;
    border-top: 1px solid $light-gray;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;

    @include small-tablet {
      margin-left: -32px;
      margin-right: -32px;
      border-top: 0;
    }

    @include large-mobile {
      margin-left: -15rem;
      margin-right: -15rem;
    }

    &__row {
      display: flex;
      flex: 1 1 auto;
      flex-direction: row;
      max-width: 1500rem;
      padding-right: 50rem;

      @include large-desktop {
        padding-right: 40rem;
      }

      @include large-tablet {
        flex-wrap: wrap;
      }

      @include small-tablet {
        padding: 0;
      }
    }

    &__column {
      height: 100%;
      position: relative;

      &_left {
        @include min-large-tablet {

          width: 423rem;
        min-width: 423rem; 
        }
      }

      &_right {
        width: 100%;
        border-left: 1px solid $light-gray;
        .not-notification {
          top: 21%;
          left: 4%;
          position: absolute;
          @include min-large-desktop{
            left: 26%;
          }
          p {
            font-size: 20px;
            margin-top: 28px;
          }
        }
        @include small-tablet {
          width: 100% !important;
        }
      }

      @include large-tablet {
        width: 100%;
        &_left {
        }
        &_right {
          display: none;
          border-left: 0;
        }
      }
    }
  }
</style>