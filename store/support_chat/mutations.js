import moment from 'moment'

export default {
  SET_SUPPORT_THEMES(state,data){
    console.log(state.switchers);
    state.support_themes = data;
    // state.active_theme_id = data[0].id;
    // state.active_status = state.switchers[0].status
  },
  SET_STATUSES_COUNTS(state,data){
    this.$collect(state.switchers).transform(function(item){
      console.log(data[`${item.text.toLowerCase()}_count`]);
      item.counter = data[`${item.text.toLowerCase()}_count`]
    });
  },
  SET_ACTIVE_THEM_ID(state,id = null){
    state.active_theme_id = id
  },
  SET_CHAT_USERS_LIST(state,{data,current_page = 1 }){
    if (current_page === 1){
      if (data.length > 0 && state.active_ticket_id){
        let index = data.findIndex(object => object.id === state.active_ticket_id);
        const user = data[index];

        data.splice(index, 1);
        data.unshift(user);
        state.number = user.id;
      }

      state.chat_users_list = data
    }else{
      state.chat_users_list.push(...data)
    }
  },
  SET_TICKET_CONVERSATIONS_USERS_LIST(state,{data,current_page = 1 }){
    data.forEach((item) => {
      item.participants = item.participants.filter(participant => participant.messageable_id !== this.$auth.user.id)[0]
    });

    if (current_page === 1){
      if (data.length > 0 && state.active_conversation_id){

        let index = data.findIndex(object => object.conversation_id === state.active_conversation_id);
        const user = data[index];

        data.splice(index, 1);
        data.unshift(user);
        state.number = user.conversation_id;
        state.chatTopUserData = user;
      }

      state.ticket_conversations_users_list = data
    }else{
      state.ticket_conversations_users_list.push(...data)
    }
  },
  SET_CHAT_USERS_LAST_PAGE(state,last_page){
    state.users_last_page = last_page
  },
  SET_CHAT_USERS_PAGE(state,current_page = 1){
    state.users_page = current_page
  },
  SET_SUPPORT_THEMES_ANSWER_LAST_PAGE(state,last_page){
    state.support_themes_answer_last_page = last_page
  },
  SET_SUPPORT_THEMES_ANSWER_PAGE(state,current_page = 1){
    state.support_themes_answer_page = current_page
  },
  SET_TICKET_CONVERSATIONS_PAGE(state,current_page = 1){
    state.ticket_conversations_page = current_page
  },
  SET_TICKET_CONVERSATIONS_LAST_PAGE(state,last_page){
    state.ticket_conversations_last_page = last_page
  },
  SET_CONVERSATION_MESSAGES_PAGE(state,current_page = 1){
    state.conversation_messages_page = current_page
  },
  SET_CONVERSATION_MESSAGES_LAST_PAGE(state,last_page){
    state.conversation_messages_last_page = last_page
  },
  SET_TICKET_TOTAL(state,total){
    console.log('total',total);
    state.ticket_total = total
  },
  DECREMENT_TICKET_TOTAL(state,count = 1){
    if (state.ticket_total) state.ticket_total -= count
  },
  SET_TICKET_THEME_TITLE(state,title){
    state.ticket_theme_title = title
  },
  SET_ACTIVE_CONVERSATION_ID(state,conversation_id = null){
    state.active_conversation_id = conversation_id
  },
  SET_ACTIVE_TICKET_ID(state,thicket_id = null){
    state.active_ticket_id = thicket_id
  },
  SET_ACTIVE_USER(state, number = null) {
    state.number = number
  },
  SET_ACTIVE_STATUS(state,status = 1){
    state.active_status = status
  },
  SET_LAST_MESSAGE_OF_LIST(state,value){
    state.lastMessage = value
  },
  SET_APPLY_FLAG(state,flag = false){
    state.apply_flag = flag
  },
  RESET_UNREAD_MESSAGES(state){
    let index = state.ticket_conversations_users_list.findIndex(object => object.conversation_id === state.active_conversation_id);
    const user = state.ticket_conversations_users_list[index];

    if (state.all_messages_unread_count) state.all_messages_unread_count -= user.unread_messages_count;

    user.unread_messages_count = 0
  },
  SET_LAST_MESSAGE_OF_LIST_MAKE_SEEN(state){
    state.lastMessage.read_at = new Date()
  },
  SET_MESSAGES_SEEN_ON_SIDEBAR(state,message){
    let index = state.ticket_conversations_users_list.findIndex(object => object.conversation_id === message.conversation_id);
    state.ticket_conversations_users_list[index].last_message.is_seen = message.last_message.is_seen
  },
  SET_ALL_MESSAGES_UNREAD_COUNT(state,value){
    state.all_messages_unread_count = value
  },
  SET_CHAT_TOP_USER_DATA(state, data) {
    state.chatTopUserData = data;
  },
  SET_SUPPORT_THEMES_ANSWER_LIST(state,{data,current_page = 1}){
    if (current_page === 1){
      state.support_themes_answer_list = data
    }else{
      state.support_themes_answer_list.push(...data)
    }
  },
  SET_SUPPORT_THEMES_ANSWER_IDENTIFIER(state){
    state.support_themes_answer_last_identifier++
  },
  SET_USERS_CHAT_SIDEBAR_IDENTIFIER(state){
    state.user_chat_sidebar_identifier++
  },
  SET_CONVERSATION_MESSAGES_IDENTIFIER(state){
    state.conversation_messages_identifier++
  },
  SET_CONVERSATION_MESSAGES(state,messages){
    if (messages.current_page === 1) {
      // state.messages = this.$collect().all();
      let newMessages = [];
      // let sortByDate = this.$collect(messages.data).sortKeys().all();


      let sortedDates = Object.keys(messages.data).sort(function(a, b) {
        return moment(a,'YYYY MMMM D') - moment(b,'YYYY MMMM D');
      });

      let sortedGroups = {};

      for (let i = 0; i < sortedDates.length; i++) {
        let date = sortedDates[i];
        sortedGroups[date] = messages.data[date];
      }

      Object.entries(sortedGroups).forEach(entry => {
        const [key, value] = entry;

        newMessages.push({
          date: key,
          messages: value.reverse()
        })
      });
      state.messages = newMessages;

      // state.scroll_id = newMessages[0] ? newMessages[0].messages[0].id : 0

    } else {
      // state.scroll_id = state.messages[0] ? state.messages[0].messages[0].id : 0;
      let paginateMessages = [];
      let sortByDate = this.$collect(messages.data).sortKeys().all();
      Object.entries(sortByDate).forEach(entry => {
        const [key, value] = entry;

        paginateMessages.push({
          date: key,
          messages: value.reverse()
        })
      });
      let paginateLastMessage = this.$collect(paginateMessages).last();
      let allExceptLast = this.$collect(paginateMessages).where('date', '<>', paginateLastMessage.date).all();
      let data = this.$collect(state.messages).where('date', paginateLastMessage.date).all();

      if (data.length > 0) {

        data[0].messages.unshift(...paginateLastMessage.messages);
        if (allExceptLast.length > 0) {
          state.messages.unshift(...allExceptLast)
        }
      } else {
        state.messages.unshift(...paginateMessages)
      }
    }
  },
  SET_MESSAGE_TO_LIST(state, message) {
    let data = this.$collect(state.messages).where('date', message.date).all();
    if (state.active_conversation_id === message.conversation_id) {
      if (data.length > 0) {
        data[0].messages.push(message);

      } else {
        state.messages.push({
          date: message.date,
          messages: [message]
        })
      }
    }
    return true
  },
  SET_MESSAGES_SEEN(state,message){
    if (state.active_conversation_id === message.conversation_id){
      state.messages.map( message => {
        this.$collect(message.messages).where('participation.messageable_id', this.$auth.user.id).where('read_at',null).transform((item, key) => item.read_at = new Date());
      })
    }
  },
  SET_CHAT_CLOSED_STATUS_BY_USER(state,data){
    if(state.active_conversation_id === data.conversation.conversation_id && !data.conversation.status){
      state.chatTopUserData.status = data.conversation.status
    }
  },
  CHANGE_LIST_FROM_EVENT(state, data) {
    console.log('asd',data);
    let index = state.ticket_conversations_users_list.findIndex(object => object.conversation_id === data.conversation.conversation_id);

    data.conversation.participants = data.conversation.participants.filter(participant => participant.messageable_id !== this.$auth.user.id)[0];

    if (index === -1){
      state.ticket_conversations_users_list.unshift(data.conversation);
      let all_count = [];
      state.ticket_conversations_users_list.map( item => {
        if (item.conversation_id === data.conversation.conversation_id) item.unread_messages_count = data.conversation.unread_messages_count;
        all_count.push(item.unread_messages_count)
      });
      state.all_messages_unread_count = all_count.reduce((sum, unread_messages_count) => sum + unread_messages_count, 0);
    }
    else if (index !== -1){

      const user = state.ticket_conversations_users_list[index];
      state.ticket_conversations_users_list.splice(index, 1);
      state.ticket_conversations_users_list.unshift(user);

      if (data.conversation.conversation_id === state.active_conversation_id){
        state.number = state.active_conversation_id
      }

      let all_count = [];
      state.ticket_conversations_users_list.map( item => {
        if (item.conversation_id === data.conversation.conversation_id) {

          item.last_message.body = data.conversation.last_message.body;
          item.last_message.created_at = data.conversation.last_message.created_at;
          item.last_message.is_sender = !data.conversation.last_message.is_sender;

          if (state.active_conversation_id !== data.conversation.conversation_id){
            item.unread_messages_count = data.conversation.unread_messages_count;
          }
        }
        all_count.push(item.unread_messages_count)
      });

      state.all_messages_unread_count = all_count.reduce((sum, unread_messages_count) => sum + unread_messages_count, 0);
      console.log(state.all_messages_unread_count);
    }
  },
  SET_SENDER_SIDEBAR(state,data){
    let index = state.ticket_conversations_users_list.findIndex(object => object.conversation_id === state.active_conversation_id);
    const user = state.ticket_conversations_users_list[index];

    state.ticket_conversations_users_list.splice(index, 1);
    state.ticket_conversations_users_list.unshift(user);

    if (user.last_message){
      user.last_message.body = data.message;
      user.last_message.created_at = data.created_at;
      if(data.message){
        user.last_message.is_sender = 0;
        user.last_message.is_seen = 0
      }else{
        user.last_message.is_sender = 1
      }
    } else{
      let is_sender;
      let is_seen;
      if(data.message){
        is_sender = 0;
        is_seen = 0;
      }else{
        is_sender = 1;
        is_seen = 0;
      }
      user.last_message = {
        body: data.message,
        created_at: data.created_at,
        is_sender: is_sender,
        is_seen: is_seen,
      };
    }

  },
  DELETE_USER_FROM_SIDEBAR(state,active_conversation_id){
    let index = state.ticket_conversations_users_list.findIndex(object => object.conversation_id === active_conversation_id);
    state.ticket_conversations_users_list.splice(index, 1);
  },
  DELETE_TICKET_FROM_SIDEBAR(state,active_ticket_id){
    let index = state.chat_users_list.findIndex(object => object.id === active_ticket_id);
    state.chat_users_list.splice(index, 1);
  }
}

