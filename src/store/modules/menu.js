import { getMenu } from '@/api/menu'
import Layout from '@/layout'
import router from '@/router'

const getDefaultState = () => {
  return {
    antRoute: [],
    existRouter: false
  }
}

const state = getDefaultState()

const mutations = {
  SET_ANT_ROUTE: (state, antRoute) => {
    state.antRoute = antRoute
  },
  SET_EXITT_ROUTER: (state, isExist) => {
    state.existRouter = isExist
  }
}

const actions = {
  addRoutes({ dispatch, commit }) {
    getMenu().then(response => {
      const { data } = response
      dispatch('filterAsyncRouter', data).then(routers => {
        commit('SET_ANT_ROUTE', routers)
        commit('SET_EXITT_ROUTER', true)
        router.addRoutes(routers)
      })
    })
  },
  filterAsyncRouter({ dispatch }, asyncRouterMap) {
    // 遍历后台传来的路由字符串，转换为组件对象
    return asyncRouterMap.filter(route => {
      if (route.component) {
        const component = route.component
        if (component === 'Layout') { // Layout组件特殊处理
          route.component = Layout
        } else if (component.search('https') !== -1 || component.search('http') !== -1) {
          route.path = component
          route.component = undefined
        } else {
          route.component = (resolve) => require([`@/views${component}`], resolve)
        }
      }
      if (route.children && route.children.length) {
        dispatch('filterAsyncRouter', route.children).then(children => {
          route.children = children
        })
      }
      return true
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
