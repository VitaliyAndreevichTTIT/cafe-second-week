import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        employees: [],
        orders: [],
        shifts: []
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
            localStorage.myApiCafeToken = token
        },
        setEmployees: (state, employees) => {   // TODO: test
            state.employees = employees
        },
        addEmployee: (state, { newEmployee, res }) => {
            console.log('State', newEmployee);
            const convertIdToGroup = [
                "Администратор",
                "Официант",
                "Повар"
            ]
            state.employees.push({
                group: convertIdToGroup[newEmployee.role_id + 1],
                id: res.data.id,
                login: newEmployee.login,
                name: newEmployee.name,
                status: "working"
            })
        },
        editEployees: (state, employee) => {
            const employeeIndex = state.employees.indexOf(employee)
            Vue.set(state.employees, employeeIndex, employee)
        },
        setOrders: (state, orders) => {
            state.orders = orders
        },
        editOrders: (state, order) => {
            const orderIndex = state.orders.indexOf(order)
            Vue.set(state.orders, orderIndex, order)
        },
        setShifts: (state, shifts) => {
            state.shifts = shifts
        },
        editShifts: (state, shift) => {
            const shiftToChange = state.shifts.find(sh => sh.id === shift.id)
            const shiftIndex = state.shifts.indexOf(shiftToChange)
            Vue.set(state.shifts, shiftIndex, shift)
        },
        addShift: (state, shift) => {
            state.shifts.push({
                active: 0,
                end: shift.end,
                id: shift.id,
                start: shift.start
            })
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
        async getUsersAsync({ commit }, token) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/user', {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + (token || localStorage.myApiCafeToken)
                }
            })
                .then(response => response.json())
                .then(result => (result))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })
            commit('setEmployees', res.data)
            return res.data;
        },
        async setNewEmployeeAsync({ commit }, form) {
            const newEmployee = {
                name: form.name.value,
                surname: form.surname.value,
                patronymic: form.patronymic.value,
                login: form.login.value,
                password: form.password.value,
                role_id: +form.role_id_employee.value
            }
            const res = await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/user', {
                method: 'POST',
                body: JSON.stringify(newEmployee),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + (localStorage.myApiCafeToken)
                }
            })
                .then(response => response.json())
                .then(result => (result))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })
            // data => id =23; status = "created"
            res.status === "created"
                ? commit('addEmployee', { newEmployee, res })
                : console.log("Created error")


        },
        async setShiftAsync({ commit }, dates) { // TODO: fix the validation problem
            const body = JSON.stringify(dates)

            const res = await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/work-shift', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.myApiCafeToken
                },
                body
            })
                .then(response => response.json())
                .then(result => commit('addShift', result))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })

            commit('addShift', res)
            return res;
        },
        async openShiftAsync({ commit }, id) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + `api-cafe/work-shift/${id}/open`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.myApiCafeToken
                },
            })
                .then(response => response.json())
                .then(result => (result))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })
            commit('editShifts', res.data)
            return res
        },
        async closeShiftAsync({ commit }, id) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + `api-cafe/work-shift/${id}/close`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.myApiCafeToken
                },
            })
                .then(response => response.json())
                .then(result => (result))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })
            commit('editShifts', res.data)
            return res
        },
        async getShiftsAsync({ commit }, token) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + 'api-cafe/work-shift', {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.myApiCafeToken
                }
            })
                .then(response => response.json())
                .then(result => (result))
                .catch(error => {
                    commit('setToken', '')
                    console.log(error)
                })
            commit('setShifts', res)
            return res;
        },
    },
    modules: {},
    getters: {
        getToken: state => (state.token),
        getEmployees: state => (state.employees),
        getWorkingEmployees: state => (state.employees.filter(emp => emp.status !== "fired")),
        getOrders: state => (state.orders),
        getShifts: state => (state.shifts)
    }
})