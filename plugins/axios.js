export default function ({$axios, $auth, redirect, store}) {
  $axios.onRequest((config) => {
    config.headers = {
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'application/json',
      // 'Accept-Language': store.LANG || 'en'
    }
  })

  $axios.onError((error) => {
    if (error.response.status === 500) {
      // redirect('/error')
    }
  })
}