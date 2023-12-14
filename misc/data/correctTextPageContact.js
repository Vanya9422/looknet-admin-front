export default {
  page_key: "contact",
  content:{
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
    map: {
      title: {
        name: "H2 header",
        key: "mapTitle",
        value: "Address"
      },
    },
    banner: {
      title: {
        name: "H2 header",
        key: "bannerTitle",
        value: "Need help"
      },
      description: {
        name: "Description",
        key: "bannerDescription",
        placeholder: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem n"
      }
    }
  }

}