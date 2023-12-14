import {minLength, required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      content: {
        title: 'My advertises',
        sortBy: 'Sort by',
        selectAll: 'Select all',
        left: 'left',
        days: 'days',
        nav: [
          {
            text: 'Active',
            slug: 'active',
            id: 1
          },
          {
            text: 'Non active',
            slug: 'nonActive',
            id: 2,
          },
          {
            text: 'Draft',
            slug: 'draft',
            id: 3
          },
        ],
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
        ],
        banner: {
          name: 'Hello',
          description: 'Your analytics on all ads ',
          favorites: "Favorites",
          view: "View",
          call: "Calls"
        },
        buttons:{
          edit: 'Edit',
          delete: 'Delete',
          draft: 'Draft',
          saleFaster: 'Sale faster',
          settings: 'Setting',
          chat: 'Chat',
          deactivation: 'Deactivation',
          activation: 'Active',
        },
        modals:{
          activate:{
            title: 'Active',
            description: 'Are you sure you want to activate this ad?',
            button: 'Confirm'
          },
          draft:{
            title: 'Draft',
            description: 'Are you sure you want to activate this ad?',
            button: 'Confirm'
          },
          delete:{
            title: 'Delete',
            description: 'Are you sure you want to activate this ad?',
            button: 'Confirm'
          },
          deactivate:{
            title: 'Deactivate',
            description: 'Are you sure you want to activate this ad?',
            button: 'Confirm'
          },
        }
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      sortBy: {required, minLength: minLength(2)},
      selectAll: {required, minLength: minLength(2)},
      left: {required, minLength: minLength(2)},
      days: {required, minLength: minLength(2)},
      sortList: {
        $each: {
          text: {required, minLength: minLength(3)}
        }
      },
      banner: {
        name: {required, minLength: minLength(2)},
        description: {required, minLength: minLength(2)},
        favorites: {required, minLength: minLength(2)},
        view: {required, minLength: minLength(2)},
        call: {required, minLength: minLength(2)}
      },
      buttons: {
        delete: {required, minLength: minLength(2)},
        draft: {required, minLength: minLength(2)},
        saleFaster: {required, minLength: minLength(2)},
        settings: {required, minLength: minLength(2)},
        chat: {required, minLength: minLength(2)},
        deactivation: {required, minLength: minLength(2)},
        activation: {required, minLength: minLength(2)},
        edit: {required, minLength: minLength(2)}
      },
      modals:{
        activate:{
          title: {required, minLength: minLength(2)},
          description: {required, minLength: minLength(2)},
          button: {required, minLength: minLength(2)}
        },
        draft:{
          title: {required, minLength: minLength(2)},
          description: {required, minLength: minLength(2)},
          button: {required, minLength: minLength(2)}
        },
        delete:{
          title: {required, minLength: minLength(2)},
          description: {required, minLength: minLength(2)},
          button: {required, minLength: minLength(2)}
        },
        deactivate:{
          title: {required, minLength: minLength(2)},
          description: {required, minLength: minLength(2)},
          button: {required, minLength: minLength(2)}
        },
      }
    }
  },

}
