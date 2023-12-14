export default ({app, redirect}) => {
  if(app.$auth.user){
    if(app.$auth.user.role.id !== 1) return redirect('/')
    else app.$auth.logout(); return redirect('/auth/user')
  }
  // else if (app.$auth.user !== null && app.$auth.user.role.id !== 1) return redirect('/')
}
