import Vue from 'vue'
import Vuex from 'vuex'
import admin from "./admin.js"
import cook from "./cook.js"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        orders: [],
       
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
            localStorage.myApiCafeToken = token
        },
        setOrders: (state, orders) => {
            state.orders = orders
        },
        editOrders: (state, order) => {
            const orderIndex = state.orders.indexOf(order)
            Vue.set(state.orders, orderIndex, order)
        }
    },
    actions: {
        async fetchLoginAsync({ commit }, personData) {
            await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/login', {
                    method: 'POST',
                    body: JSON.stringify(personData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(result => commit('setToken', result.data.user_token))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })
        },
        async getOrdersAsync({ commit }, token) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/order/taken/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + (token || localStorage.myApiCafeToken)
                    }
                })
                .then(response => response.json())
                .then(result => (result.data))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })

            commit('setOrders', res)
            return res;
        },
        async changeStatusAsync({ commit }, { id, status, token }) {
            const patchStatus = JSON.stringify({ status })
            const res = await fetch(process.env.VUE_APP_SECOND_URL + `api-cafe/order/${id}/change-status`, {
                    method: 'PATCH',
                    body: patchStatus,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + (token || localStorage.myApiCafeToken)
                    },
                })
                .then(response => response.json())
                .then(result => (result.data))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })
            return res;
        },
        async logoutAsync({ commit }, token) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/logout', {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + (token || localStorage.myApiCafeToken)
                    },
                })
                .then(response => response.json())
                .then(result => (result))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })
            localStorage.myApiCafeToken = ""
            commit('setToken', '')
            return res;
        },


    },
    modules: {
        admin,
        cook
    },
    getters: {
        getOrders: state => (state.orders),
    }
})