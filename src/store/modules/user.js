import { login } from '@/api/user'
import { getAccessToken, getRefreshToken, removeToken, setAccessToken, setRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ACCESS_TOKEN: (state, accessToken) => {
    state.accessToken = accessToken
  },
  SET_REFRESH_TOKEN: (state, refreshToken) => {
    state.refreshToken = refreshToken
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_ACCESS_TOKEN', data.accessToken)
        commit('SET_REFRESH_TOKEN', data.refreshToken)
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    const token = getAccessToken()
    const payload = token.split('.')[1]
    const userInfoJson = JSON.parse(decodeURIComponent(escape(window.atob(payload.replace(/-/g, '+').replace(/_/g, '/')))))
    const { nickname, avatar } = userInfoJson.data
    commit('SET_NAME', nickname)
    commit('SET_AVATAR', avatar)
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // TODO 暂时为前端删除token,退出登录接口还没好
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

