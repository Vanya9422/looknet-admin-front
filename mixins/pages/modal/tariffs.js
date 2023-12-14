import {minLength, required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: false,
      id: null,
      content: {
        title: 'The announcement is published!',
        desc: 'The first photo will be displayed in the search results, choose the most successful one',
        // month: 'Pery month',
        choose: 'Choose',
        more: 'more',
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      desc: {required, minLength: minLength(2)},
      // month: {required, minLength: minLength(2)},
      choose: {required, minLength: minLength(2)},
      more: {required, minLength: minLength(2)}
    }
  },
}
