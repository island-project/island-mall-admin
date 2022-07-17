const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  accessToken: state => state.user.accessToken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  antRoute: state => state.menu.antRoute
}
export default getters
