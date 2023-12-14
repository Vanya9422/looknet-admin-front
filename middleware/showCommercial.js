export default ({app, redirect}) => {
  const permission = 2
  if (app.$auth.user) {
    if (app.$auth.user.role.id !== 1) {
      const getIndex = app.$auth.user.permissions_ids.findIndex(item => item === permission)
      if (getIndex < 0) {
        return redirect('/announcement-list')
      }
    } else {
      return redirect('/announcement-list')
    }
  } else {
    return redirect('/announcement-list')
  }
}
