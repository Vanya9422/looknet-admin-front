export default ({ app, redirect }) => {
  app.$echo.connector.options.auth.headers.Authorization = `Bearer ${app.$auth.strategy.token.get()}`;
}
