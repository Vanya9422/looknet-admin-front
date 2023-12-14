import {minLength, required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: false,
      id: null,
      content: {
        title: 'Statistics',
        name: 'Name',
        description: 'Description',
        list:[
          {
            title:'Favorites',
            text:'Tellus elementum sagittis vitae et leo duis ut diam. Libero id faucibus nisl tincidunt eget nullam non nisi. Vitae nunc sed velit dignissim sodales. Ornare arcu dui vivamus arcu felis.',
          },
          {
            title:'View',
            text:'Tellus elementum sagittis vitae et leo duis ut diam. Libero id faucibus nisl tincidunt eget nullam non nisi. Vitae nunc sed velit dignissim sodales.',
          },
          {
            title:'Call',
            text:'Tellus elementum sagittis vitae et leo duis ut diam. Libero id faucibus nisl tincidunt eget nullam non nisi. Vitae nunc sed velit dignissim sodales. Ornare arcu dui vivamus arcu felis.',
          }
        ],
      },
    }
  },
  validations: {
    content: {
      title: {required, minLength: minLength(2)},
      name: {required, minLength: minLength(2)},
      description: {required, minLength: minLength(2)},
      list:{
        $each: {
          title: {required, minLength: minLength(3)},
          text: {required, minLength: minLength(3)}
        }
      }
    }
  },
}