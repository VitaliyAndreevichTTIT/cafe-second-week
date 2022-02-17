import Vue from 'vue'
import Vuex from 'vuex'

export default {
    state: () => ({
        employees: [],
        shifts: []
    }),
    mutations: {
        setEmployees: (state, employees) => {
            state.employees = employees
        },
        addEmployee: (state, { newEmployee, res }) => {
            const convertIdToGroup = [
                "Администратор",
                "Официант",
                "Повар"
            ]
            state.employees.push({
                group: convertIdToGroup[newEmployee.role_id - 1],
                id: res.data.id,
                login: newEmployee.login,
                name: newEmployee.name,
                status: "working"
            })
        },
        editEmployees: (state, employee) => {
            const employeeIndex = state.employees.indexOf(employee)
            Vue.set(state.employees, employeeIndex, employee)
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
            console.log("response", res);
            res.data.status === "created" ?
                commit('addEmployee', { newEmployee, res }) :
                console.log("Created error")
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
        async setEmployyeToShiftAsync({ commit }, shiftId, employeeId) {
            const res = await fetch(process.env.VUE_APP_SECOND_URL + `api-cafe/work-shift/${shiftId}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + (localStorage.myApiCafeToken)
                    },
                    body: JSON.stringify({ user_id: employeeId })
                })
                .then(response => response.json())
                .then(result => result)
                .catch(error => console.log('setEmployyeToShiftAsync', error))
        }
    },
    getters: {
        getEmployees: state => (state.employees),
        getShifts: state => (state.shifts),
        getWorkingEmployees: state => state.employees.filter(emp => emp.status !== "fired")
    }
}