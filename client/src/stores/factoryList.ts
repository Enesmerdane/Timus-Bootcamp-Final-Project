import { defineStore } from 'pinia'
import { usePageStore } from './pageState'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useFactoryListStore = defineStore('factoryList', {
    state: () => ({ factoryList: [] }),
    getters: {
        getFactoryList: (state) => state.factoryList
    },
    actions: {
        async loadFactoryList(page: number) {
            try {
                const pageState = usePageStore()
                pageState.setLoading(true)

                axios({
                    method: 'get',
                    url: '/api/factory',
                    params: {
                        page
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                        console.log('data: ', res)

                        pageState.setLoading(false)
                    })
                    .catch((err) => {
                        // it because authGuard exceptions are not handled in backend

                        // refresh access token if any
                        if (err.response.data.statusCode === 401) {
                            const authStore = useAuthStore()

                            let refreshToken = authStore.getRefreshToken

                            if (refreshToken !== null) {
                                axios({
                                    method: 'post',
                                    url: '/api/auth/renewtoken',
                                    data: {
                                        refreshToken
                                    },
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then((res) => {
                                        // in this case we retrieve access token in cookies
                                        pageState.setLoading(true)
                                        this.loadFactoryList(page)
                                        pageState.setLoading(false)
                                    })
                                    .catch((err) => {
                                        // refresh token invalid or expired
                                        authStore.$reset()
                                        pageState.setLoading(false)
                                    })
                            } else {
                                // we dont have refreshToken
                                console.log(err)
                            }
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }
})
