import {mapActions, mapGetters} from "vuex";
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';

export default {
  data() {
    return {
      filterKey: 0,
      filter: [
        {
          name: 'name',
          label: 'Name',
          value: '',
          key: 'name'
        },
        {
          name: 'contact_phone_numeric',
          label: 'Phone',
          value: '',
          key: 'contact_phone_numeric'
        },
        {
          name: 'id',
          label: 'Id',
          value: '',
          key: 'id'
        },
      ],
      filter1: [
        {
          name: 'created_at',
          label: 'Date',
          date: [null, null],
          value: null,
          key: 'date',
          created_at: 'id'
        }
      ],
      search: true,
      openDatePiker: false,
      checkedList: [],
      checkedListFlag: false,
      costFlag: null,
      cost: {
        min: '0',
        max: ''
      }
    }
  },
  components: {DatePicker},
  watch: {
    cost: {
      handler(newValue) {
        this.search = false
        const result = newValue.max.replace(/(?!-)[^0-9,]/g, "")
        this.$nextTick(() => this.cost.max = result);
      },
      deep: true
    },
    CATEGORY() {
      this.search = false
    },
    filter: {
      handler() {
        this.search = false
      },
      deep: true
    },
    filter1: {
      handler() {
        this.search = false
      },
      deep: true
    },
  },
  computed: {
    ...mapGetters({
      CATEGORIES: 'category/CATEGORIES',
      CATEGORY: 'category/CATEGORY',
      CATEGORY_ACTIVE: 'category/CATEGORY_ACTIVE',
    })
  },
  methods: {
    ...mapActions({
      SET_CATEGORIES: 'category/SET_CATEGORIES',
      SET_REMOVE_CATEGORY: 'category/SET_REMOVE_CATEGORY',
      SET_CATEGORIES_ACTIVE: 'category/SET_CATEGORIES_ACTIVE',
    }),
    removeCategory() {
      this.SET_REMOVE_CATEGORY()
    },
    removeValue(i) {
      this.filter[i].value = ''
      this.filterKey++
      this.searchProduct()
    },
    removeDate() {
      this.filter1[0].value = ''
      this.filter1[0].date = [null, null]
      this.filterKey++
      this.searchProduct()
    },
    removeCost() {
      this.cost = {
        min: '0',
        max: ''
      }
      this.filterKey++
      this.searchProduct()
    },
    clearSearch() {
      this.filter.forEach(i => i.value = '')
      this.filter1[0].value = ''
      this.filter1[0].date = [null, null]
      this.cost = {
        min: '0',
        max: ''
      }
      this.filterKey++
      this.searchProduct()
    },
    changeActive(number) {
      this.SET_CATEGORIES_ACTIVE(number)
    },
    removeItem(id) {
      const getIndex = this.checkedList.findIndex(item => item === id)
      this.checkedList.splice(getIndex, 1)
    },

  }
}