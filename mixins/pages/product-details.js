import {minLength, required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: false,
      id: null,
      content: {
        show: {
          number:"Show number",
          more:'Show more details'
        },
        message: 'Message',
        sendMessage: 'Send a message',
        registered: 'Registered',
        id: 'ID',
        overview: 'Overview',
        description: 'Description',
        openModalBtn: 'User Ads',
        onMap: 'On map',
        hideMap: 'Hide map',
        more: 'Show more',
        recommend: 'Recommend',
        showMoreProduct: 'Show More',
        close: 'Close',
        moreDesc: 'more',
        hideDesc: 'hide',
        km: 'km near you',
        available_cost: 'Bargaining is appropriate',
      },
    }
  },
  validations: {
    content: {
      show: {
        number:{required, minLength: minLength(2)},
        more:{required, minLength: minLength(2)}
      },
      message: {required, minLength: minLength(2)},
      sendMessage: {required, minLength: minLength(2)},
      registered: {required, minLength: minLength(2)},
      id: {required, minLength: minLength(2)},
      overview: {required, minLength: minLength(2)},
      description: {required, minLength: minLength(2)},
      openModalBtn: {required, minLength: minLength(2)},
      onMap: {required, minLength: minLength(2)},
      hideMap: {required, minLength: minLength(2)},
      more: {required, minLength: minLength(2)},
      recommend: {required, minLength: minLength(2)},
      showMoreProduct: {required, minLength: minLength(2)},
      close: {required, minLength: minLength(2)},
      moreDesc: {required, minLength: minLength(2)},
      hideDesc: {required, minLength: minLength(2)},
      km: {required, minLength: minLength(2)},
      available_cost: {required, minLength: minLength(2)},
    }
  },
}
