export default {
  data() {
    return {
      files: [],
      dt: new DataTransfer(),
      idx: 0
    }
  },
  methods: {
    changeFiles(id = 'files') {
      const oldFiles = document.getElementById(id).files
      for (let file of oldFiles) {
        this.dt.items.add(file);
      }
      document.getElementById(id).files = this.dt.files;
      this.getFileObject(id)
    },
    getFileObject(id = 'files') {
      const files = document.getElementById(id).files
      const fileArray = Array.from(files);
      const fileObjects = fileArray.map(file => {
        return new Promise(resolve => {
          let reader = new FileReader();
          reader.onload = e => {
            resolve({
              size: file.size,
              type: file.type,
              file: e.target.result,
              original_full_url: e.target.result,
              name: file.name,
            });
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(fileObjects).then(items => this.files = items);
    },
    deleteItem(index, id = 'files') {
      this.dt.items.remove(index);
      document.getElementById(id).files = this.dt.files;
      this.getFileObject(id)
    },
    deleteItemAll() {
      this.dt = new DataTransfer()
      document.getElementById('files').files = this.dt.files;
      this.getFileObject()
    }
  }
}