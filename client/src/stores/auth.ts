import { defineStore } from 'pinia'
import axios from 'axios'
import { usePageStore } from './pageState'

export const useAuthStore = defineStore('auth', {
    state: () => ({ userId: null, userName: null, refreshToken: null }),
    getters: {
        getUserId: (state) => state.userId,
        getUserName: (state) => state.userName,
        getRefreshToken: (state) => state.refreshToken
    },
    actions: {
        async login(email: string, password: string) {
            try {
                const pageStore = usePageStore()
                pageStore.setLoading(true)

                const result = await axios({
                    method: 'post',
                    url: '/api/auth/login',
                    data: JSON.stringify({
                        email,
                        password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                this.refreshToken = result.data.payload.refreshToken
                this.userName = result.data.payload.userName
                this.userId = result.data.payload.userId

                pageStore.setLoading(false)

                console.log(result)
                console.log(this.$state)
            } catch (error) {
                console.log(error)
            }
        },
        async register(email: string, password: string, username: string, role: number) {
            try {
                const pageStore = usePageStore()
                pageStore.setLoading(true)

                const result = await axios({
                    method: 'post',
                    url: '/api/auth/register',
                    data: JSON.stringify({
                        email,
                        password,
                        username,
                        role
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                pageStore.setLoading(true)

                console.log(result)
                console.log(this.$state)
            } catch (error) {
                console.log(error)
            }
        },
        async logout() {
            try {
                const pageStore = usePageStore()
                pageStore.setLoading(true)

                this.refreshToken = null
                const res = await axios({
                    method: 'post',
                    url: '/api/auth/logout',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                pageStore.setLoading(true)

                console.log(res)
                console.log(this.$state)
            } catch (error) {
                console.log(error)
            }
        },
        async renewToken() {
            try {
                console.log(this.refreshToken)

                const res = await axios({
                    method: 'post',
                    url: 'api/auth/renewtoken',
                    data: JSON.stringify({
                        refreshToken: this.refreshToken
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                console.log(res)
                console.log(this.$state)
            } catch (error) {
                console.log(error)
            }
        }
    }
})
