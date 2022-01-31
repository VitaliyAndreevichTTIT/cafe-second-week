import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
            localStorage.myApiCafeToken = token
        }
    },
    actions: {
        async fetchLoginAsync(context, personData) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/login', {
                method: 'POST',
                body: JSON.stringify(personData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(result => result)
                .catch(error => console.log(error))
            
            context.commit('setToken', res.data.user_token)
        },
        async getCooks(context, token) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/order/taken/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + (token || localStorage.myApiCafeToken)
                }
            })
                .then(response => response.json())
                .then(result => (result.data))
            return res;
        },
        async changeStatus({commit}, { id, status, token }) {
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
                .catch(error => console.log(error))
            return res;
        },
        async logoutAsync(context, token) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/logout', {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + (token || localStorage.myApiCafeToken)
                },
            })
                .then(response => response.json())
                .then(result => (result))
                .catch(error => console.log('Error', error))
            localStorage.myApiCafeToken = ""
            context.commit('setToken', '')
            return res;
        }
    },
    modules: {},
    getters: {
        getToken: state => (state.token)
    }
})