export default {
 FETCH_SUPPORT_THEMES({commit},data){
   let params = {
     page: 1,
     perPage: 20,
   };
   this.$axios.setHeader('Accept-Language',  'en');
   this.$axios.get(this.$supportChat.support.themes,{params}).then(res => {
     // commit('SET_SUPPORT_THEMES',res.data.data)
   });
 },
  FETCH_SUPPORT_THEMES_ANSWER_LIST({state,commit},{active_theme_id,active_status,search}){
    console.log('search',search);
    let params = {
      page: state.support_themes_answer_page,
      perPage: state.support_themes_answer_per_page,
      searchJoin:'and',
      orderBy:'created_at',
      sortedBy:'desc',
      with : 'user:id,first_name;user.avatar',
      search : `support_theme_id:${active_theme_id};status:${active_status}`,
    };


    if (state.active_status === state.expectation || state.active_status === state.viewed){
      params.search += `;moderator_id:${this.$auth.user.id}`
    }

    if (search){
      params.search += `;${search}`
    }

    return new Promise((resolve, reject) => {
      let loaded = undefined;
      this.$axios.setHeader('Accept-Language',  'en');
      this.$axios.$get(this.$supportChat.support.tickets,{
        params
      }).then(({ data, meta:{last_page, current_page},themes,tickets_statuses_counts}) => {
          commit('SET_SUPPORT_THEMES_ANSWER_LAST_PAGE',last_page);
          commit('SET_SUPPORT_THEMES_ANSWER_PAGE',current_page + 1);
          commit('SET_SUPPORT_THEMES_ANSWER_LIST',{data,current_page});
          commit('SET_SUPPORT_THEMES',themes);
          commit('SET_STATUSES_COUNTS',tickets_statuses_counts);
          loaded = current_page <= last_page;
          resolve(loaded);
      });
    })
 },
 FETCH_CHAT_USERS_LIST({state,commit},{theme_id,status}){
   let params = {
     page: state.users_page,
     perPage: state.users_per_page,
     searchJoin:'and',
     with : 'user:id,first_name;user.avatar',
     search : `support_theme_id:${theme_id};status:${status}`,
     sortedBy: 'desc',
     orderBy: 'updated_at'
   };

   return new Promise((resolve, reject) => {
     let loaded = undefined;
     this.$axios.setHeader('Accept-Language',  'en');
     this.$axios.get(this.$supportChat.support.tickets,{
       params
     })
         .then(({data: {data, meta:{last_page, current_page,total},themes}}) => {
           const title = this.$collect(themes).where('id',parseInt(theme_id)).first().title;
               commit('SET_CHAT_USERS_LAST_PAGE',last_page);
               commit('SET_CHAT_USERS_PAGE',current_page + 1);
               commit('SET_CHAT_USERS_LIST',{data,current_page});
               commit('SET_TICKET_TOTAL',total);
               commit('SET_TICKET_THEME_TITLE',title);
               loaded = current_page <= last_page;
               resolve(loaded);
         }
       );
    })
 },
  FETCH_CHAT_TICKET_CONVERSATIONS_LIST({state,commit},{theme_id,ticket_status}){
   let params = {
     page: state.ticket_conversations_page,
     perPage: state.ticket_conversations_per_page,
     theme_id:theme_id,
     ticket_status:ticket_status,
   };
   return new Promise((resolve, reject) => {
     let loaded = undefined;
     this.$axios.setHeader('Accept-Language',  'en');
     this.$axios.get(this.$supportChat.support.ticket_conversations,{
       params
     })
         .then(({data: {data, meta:{last_page, current_page,total},theme:{title}}}) => {
               commit('SET_TICKET_CONVERSATIONS_LAST_PAGE',last_page);
               commit('SET_TICKET_CONVERSATIONS_PAGE',current_page + 1);
               commit('SET_TICKET_TOTAL',total);
               commit('SET_TICKET_THEME_TITLE',title);
               commit('SET_TICKET_CONVERSATIONS_USERS_LIST',{data,current_page});
               loaded = current_page <= last_page;
           resolve(loaded);
         }
       );
    })
 },
 FETCH_CONVERSATION_MESSAGES({state,commit},conversation_id){
   return new Promise((resolve, reject) => {
     let loaded = undefined;
     this.$axios.$get(this.$supportChat.support.getMessages + '/' + conversation_id + `/messages?page=${state.conversation_messages_page}&perPage=${state.conversation_messages_per_page}&sorting=desc`)
         .then(({data: {data, last_page, current_page}}) => {
               commit('SET_CONVERSATION_MESSAGES_LAST_PAGE', last_page);
               commit('SET_CONVERSATION_MESSAGES_PAGE', current_page + 1);
               commit('SET_CONVERSATION_MESSAGES', {data, current_page});
               loaded = current_page <= last_page;
               console.log(current_page <= last_page);
               resolve(loaded);
             }
         );
   })
 },
 SEND_MESSAGE({commit}, data) {
   return new Promise((resolve, reject) => {
     this.$axios.post('/chat/conversations/' + data.conversation_id + '/messages', data.data).then(res => {
       commit('SET_SENDER_SIDEBAR', {message: res.data.data.body, created_at: res.data.data.created_at});
       resolve(res)
     }).catch(err => {
       reject(err)
     });
   })
 },
 APPLY({commit},active_ticket_id){
   return this.$axios.$put(`/admin/supports/${active_ticket_id}/accept`,{conversation_type:'support'});
 },
 CLOSE_OR_VIEWED({commit},{active_ticket_id,value}){
   return this.$axios.$put(`/admin/supports/${active_ticket_id}/${value}`);
 }
}
