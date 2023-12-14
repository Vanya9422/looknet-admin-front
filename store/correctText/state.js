import correctTextType from '~/misc/data/correctTextType.js'
import correctTextPages from '~/misc/data/correctTextPages.js'
import correctTextPageContact from '~/misc/data/correctTextPageContact.js'
export default  () => ({
  loading: false,
  languages: null,
  lang: 'en',
  types: correctTextType,
  type: '',
  pages: correctTextPages[correctTextType[0].code],
  page: '',
  correct:null,
  contact:correctTextPageContact,
  openModal:false
})


