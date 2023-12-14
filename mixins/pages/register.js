import {minLength, required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      content: {
        create: 'Create your profile',
        singWith: 'Or Sign in with',
        title: "Contacts new",
        name: {
          label: 'Name',
          placeholder: 'Your name'
        },
        lName: {
          label: 'Second name',
          placeholder: 'Your second name'
        },
        username: {
          phone: 'Phone',
          email: 'Email',
          placeholder: 'Enter your phone number or email'
        },
        existEmail:'Exist Email',
        existPhone:'Exist Phone',
        password: {
          label: 'Password',
          placeholder: 'Enter the password',
          rules: {
            title: 'Rules:',
            list: ['At least 8 characters'],
          },
        },
        checkbox: 'I agree with rules of this system',
        login: 'Log in',
        sing: 'Sign in',
        haveProfile: 'Do you already have a profile?',
      },
    }
  },
  validations: {
    content: {
      create: {required, minLength: minLength(4)},
      singWith: {required, minLength: minLength(4)},
      name: {
        label: {required, minLength: minLength(2)},
        placeholder: {required, minLength: minLength(2)}
      },
      lName: {
        label: {required, minLength: minLength(2)},
        placeholder: {required, minLength: minLength(2)}
      },
      password: {
        label: {required, minLength: minLength(2)},
        placeholder: {required, minLength: minLength(2)},
        rules: {
          title: {required, minLength: minLength(2)},
          list: {
            $each: {required, minLength: minLength(3)},
          },
        },
      },
      username: {
        email: {required, minLength: minLength(2)},
        phone: {required, minLength: minLength(2)},
        placeholder: {required, minLength: minLength(2)}
      },
      existEmail: {required, minLength: minLength(2)},
      existPhone: {required, minLength: minLength(2)},
      checkbox: {required, minLength: minLength(2)},
      login: {required, minLength: minLength(2)},
      sing: {required, minLength: minLength(2)},
      haveProfile: {required, minLength: minLength(2)},
    }
  },
}
