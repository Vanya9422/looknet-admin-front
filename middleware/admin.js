export default ({ app, redirect }) => {
  // if (app.$auth.user === null) return redirect('/auth/login')

  if (!app.$auth.user || app.$auth.user.role.id === 1) {
    return redirect('/auth/login')
  }
}

