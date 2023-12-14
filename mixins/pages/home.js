import {minLength, required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      content: {
        // vip: {
        //   title: 'VIP advertise'
        // },
        recommend: {
          title: 'Recommend for you'
        },
        search: {
          title: 'Search. Buy. ',
          titleBlue: 'Sell.',
          placeholder: 'Search for ads',
          city: 'City',
          search: 'Search',
        },
        allCategories: 'All categories',
        searchModal: {
          categories: 'Categories',
        }
      },
    }
  },
  validations: {
    content: {
      // vip: {
      //   title: {required, minLength: minLength(2)},
      // },
      recommend: {
        title: {required, minLength: minLength(2)},
      },
      search: {
        // title: {required, minLength: minLength(2)},
        // titleBlue: {required, minLength: minLength(2)},
        placeholder: {required, minLength: minLength(2)},
        city: {required, minLength: minLength(2)},
        search: {required, minLength: minLength(2)},
      },
      allCategories: {required, minLength: minLength(2)},
      searchModal: {
        categories: {required, minLength: minLength(2)},
      }
    }
  },
}
