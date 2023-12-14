import {minLength, required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      content: {
        loginWith: 'Login with',
        username: {
          placeholder: 'Enter the login'
        },
        password: {
          placeholder: 'Enter the password'
        },
        registration: 'Registration',
        login: 'Login',
        sing: 'Sign in',
        forget: 'Forgot password?',
      },
    }
  },
  validations: {
    content: {
      loginWith: {required, minLength: minLength(4)},
      username: {
        placeholder: {required, minLength: minLength(2)}
      },
      password: {
        placeholder: {required, minLength: minLength(2)}
      },
      registration: {required, minLength: minLength(2)},
      login: {required, minLength: minLength(2)},
      sing: {required, minLength: minLength(2)},
      forget: {required, minLength: minLength(2)},
    }
  },
}