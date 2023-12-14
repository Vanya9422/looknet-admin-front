export default ({app, redirect}) => {
  if (!app.$auth.user || app.$auth.user.role.id === 1) redirect('/auth/login')
}
