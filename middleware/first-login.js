export default ({redirect}) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user ) {
    return redirect('/setting')
  }
  localStorage.setItem('user', 0)
}
