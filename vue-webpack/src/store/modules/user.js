import shop from '../../api/shop'
import * as types from '../mutation-types'

// types
const ADD_USER = 'users/ADD_USER'
const FETCH_ALL = 'users/FETCH_ALL'
const TOGGLE_DONE = 'users/TOGGLE_DONE'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allUsers: state => state.all
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
