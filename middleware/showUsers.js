export default ({app, redirect}) => {
  const permission = 1
  console.log(app.$auth)
  if (app.$auth.user) {
    if (app.$auth.user.role.id !== 1) {
      const getIndex = app.$auth.user.permissions_ids.findIndex(item => item === permission)
      if (getIndex < 0) {
        return redirect('/announcement-list')
      }
    } else {
      return redirect('/auth/login')
    }
  } else {
    return redirect('/auth/login')
  }
}
