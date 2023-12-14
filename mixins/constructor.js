import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      key:0,
      loading: false,
      id: null,
      content: {
        title: "Contacts new",
        phone: {
          title: "Phone numbers",
          listLabels: [
            {
              id: 1,
              label: "For customers",
              value: "For customers"
            },
            {
              id: 2,
              label: "For cooperation",
              value: "For cooperation"
            }
          ],
          list: [
            {
              label: 1,
              value: "+1 303 420 00 31",
            },
            {
              label: 2,
              value: "Info@marketplace.org",
            }
          ]
        },
        email: {
          title: "E-mails",
          listLabels: [
            {
              id: 1,
              value: "For cooperation"
            },
            {
              id: 2,
              value: "For support"
            }
          ],
          list: [
            {
              label: 1,
              value: "Info@marketplace.org",
            },
            {
              label: 2,
              value: "Info@marketplace.org",
            }
          ]
        },
        address: {
          title: "E-mails",
          listLabels: [
            {
              id: 1,
              value: "For cooperation"
            },
            {
              id: 2,
              value: "For support"
            }
          ],
          list: [
            {
              label: 1,
              value: "Info@marketplace.org",
            },
            {
              label: 2,
              value: "Info@marketplace.org",
            }
          ]
        },
        map: {
          title: "H2 header",
          latitude: "mapTitle",
          longitude: "Address"
        },
        banner: {
          name: 'Didn\'t find the answer for your question?',
          desc: 'You can ask us here',
          btn: 'Contact Us'
        }
      },
      background_images: {
        background: {},
        bannerBackground: {}
      },
      imageKey: 0,
      old_background_images: {
        background: null,
        bannerBackground: null
      },
      files: [],
      keyImage: '',
      deleteImage: null
    }
  },
  computed: {
    ...mapGetters({
      PAGE: 'correctText/PAGE',
      LANG: 'correctText/LANG',
      TYPE: 'correctText/TYPE',
    })
  },
  watch: {
    async LANG(val) {
      await this.getInfo()
    }
  },
  async created() {
    await this.getInfo()
  },
  methods: {
    changeImage({key, val}) {
      console.log(this.files,'files1')
      console.log({key, val})
      console.log(this.files,'files2')
      let findKey = this.files.findIndex(item => item.image_key === key)
      if (findKey >= 0 ) this.files.splice(findKey, 1)
      console.log(findKey)
      this.files.push({
        media_id: val.id,
        image_key: key
      })
      this.background_images[key] = val
      this.imageKey++
      this.keyImage = ''
    },
    ...mapActions({
      SAVE_PAGE: 'correctText/SAVE_PAGE'
    }),
    changePage(data) {
      this.id = data.id
       if(data.content)this.content = JSON.parse(data.content)
      this.background_images = data.background_images
      this.old_background_images = data.background_images
    },
    async getInfo() {
      try {
        // let key = this.PAGE
        // if (this.LANG !== 'en') key += `-${this.LANG}`
        const url = this.$getQuery({
          page_key: this.PAGE,
          type: this.TYPE
        })

        this.$axios.setHeader('Accept-Language', this.LANG || 'en')
        const {data} = await this.$axios.$get(`${this.$api.page}?${url}`)
        this.changePage(data)
      }catch (e){
        console.log(e)
      }  finally {
        this.loading = true
        this.key++
      }
    },
    addNewOne(item) {
      const array = {
        label: 1,
        value: ''
      }
      this.content[item].list.push(array)
    },
    deleteOne(item, index) {
      if (this.content[item].list.length > 1) this.content[item].list.splice(index, 1)
    },
    deleteImageModal(item) {
      console.log(item)
      if (item) {
        this.deleteImage = item.id
        this.$bvModal.show('modal-delete')
      }
    },
    deleteImageFromMedia() {
      let id = this.deleteImage
      this.$axios.$delete(`${this.$api.gallery}/${id}`).then(res => {
        for (const [key, value] of Object.entries(this.background_images)) {
          if (value.id === id) {
            this.background_images[key] = {}
            this.imageKey++
          }
        }
      })
    },
    deleteOldPhoto() {
      if (this.files.length > 0) {
        console.log(this.old_background_images)
        let media_ids = []
        this.files.forEach(item => {
          media_ids.push(this.old_background_images[item.image_key].id)
        })
        const data = {
          media_ids,
          _method: 'DELETE'
        }
        // this.$axios.$post(this.$api.gallery, data).then(res => console.log(res))
      }
    },
    save() {
      this.SAVE_PAGE({files: this.files, content: this.content, id: this.id})
          .then(({data}) => {
            // this.deleteOldPhoto()
            this.files = []
            this.changePage(data)
          })
    }
  }
}
