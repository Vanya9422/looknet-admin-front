import {minLength, required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      content: {
        title: 'Catalog',
        allCategories: 'All categories',
        filters: 'Filters',
        reset: 'Reset',
        cost: 'Cost',
        apply: 'Apply',
        sortBy: 'Sort by',
        sortList: [
          {
            label: 'Newest',
            text: 'Newest',
            value: 'orderBy=id&sortedBy=desc'
          },
          {
            label: 'Older',
            text: 'Older',
            value: 'orderBy=id&sortedBy=asc'
          },
          {
            label: 'Expensive',
            text: 'Expensive',
            value: 'orderBy=price&sortedBy=desc'
          },
          {
            label: 'Cheap',
            text: 'Cheap',
            value: 'orderBy=price&sortedBy=asc'
          }
        ]
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      allCategories: {required, minLength: minLength(2)},
      filters: {required, minLength: minLength(2)},
      reset: {required, minLength: minLength(2)},
      cost: {required, minLength: minLength(2)},
      apply: {required, minLength: minLength(2)},
      sortBy: {required, minLength: minLength(2)},
      sortList: {
        $each: {
          text: {required, minLength: minLength(3)}
        }
      },
    }
  },


}
