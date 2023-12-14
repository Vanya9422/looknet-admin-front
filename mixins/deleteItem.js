export default {
  data(){
    return {
      deleteId:null,
    }
  },
  watch:{
    deleteId(val){
      if(val){
        this.$root.$emit('bv::show::modal', 'modal-delete')
      }
    }
  },
  methods:{

  }
}