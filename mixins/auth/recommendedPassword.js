export default {
  data() {
    return {
      recommendedErrorCount: 0,
      recommended: {
        lowerCaseLetters: false,
        upperCaseLetters: false,
        numbers: false,
        symbols: false,
        lengthText: false
      },
      PASSWORD_ERROR: {
        lowerCaseLetters: 'Must contain a lowercase letter.',
        upperCaseLetters: 'Must contain an uppercase letter.',
        numbers: 'Must contain a number.',
        symbols: 'Must contain a special character.',
        lengthText: 'Must be at least 8 characters long.'
      },
      errors: {},

      current_password_error:false
    }
  },
  computed: {
    recommendedType() {
      if (this.recommendedPasswordCount > 2 && this.recommendedPasswordCount < 5) return 'warning';
      else if (this.recommendedPasswordCount >= 5) return 'success';
      else return 'error';
    },
    recommendedError() {
      return this.recommended.lowerCaseLetters || this.recommended.upperCaseLetters || this.recommended.numbers || this.recommended.symbols;
    },
    recommendedErrorText() {
      return this.recommended.lengthText || this.recommended.lowerCaseLetters || this.recommended.upperCaseLetters || this.recommended.numbers || this.recommended.symbols || '';
    },
    recommendedPasswordCount() {
      if (this.$v.form.password.$dirty) {
        let count = 0;

        for (const k in this.recommended) {
          if (!this.recommended[k]) count++;
        }
        this.recommendedErrorCount = count;
        return count;
      }
    }
  },
  methods: {

    recommendedPassword(pass) {
      this.errors.password = false
      if (this.current_password_error) this.current_password_error = false
      this.$v.form.password.$touch()
      this.recommended.lowerCaseLetters = pass.match(/[a-z]/g) && !pass.match(/[а-з]/g) ? false : this.PASSWORD_ERROR.lowerCaseLetters
      this.recommended.upperCaseLetters = pass.match(/[A-Z]/g) && !pass.match(/[А-З]/g) ? false : this.PASSWORD_ERROR.upperCaseLetters
      this.recommended.numbers = pass.match(/[0-9]/g) ? false : this.PASSWORD_ERROR.numbers
      this.recommended.symbols = pass.match(/[.*+?^${}!@#%&_:<>()|/\-[\]\\]/g) ? false : this.PASSWORD_ERROR.symbols
      this.recommended.lengthText = pass.length >= 8 ? false : this.PASSWORD_ERROR.lengthText
    }
  }
}
