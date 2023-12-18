import { defineStore } from 'pinia'
import { usePageStore } from './pageState'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useFactoryStore = defineStore('factory', {
    state: () => ({
        factoryList: [] as any[],
        factoryDetailsList: [] as any[],
        factoryColumnTypes: [] as any[],
        factoryDetailsColumnTypes: [] as any[]
    }),
    persist: true,
    getters: {
        getFactoryList: (state) => state.factoryList,
        getFactoryDetails: (state) => state.factoryDetailsList,
        getFactoryTableColumnTypes: (state) => state.factoryColumnTypes,
        getFactoryDetailsTableColumnTypes: (state) => state.factoryDetailsColumnTypes
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
                    .then(async (res) => {
                        //console.log('data: ', res)

                        this.factoryList = res.data.payload

                        //console.log(res.data.payload)

                        const result = await axios({
                            method: 'get',
                            url: '/api/factorytablecolumns'
                        })

                        //console.log(result)

                        this.factoryColumnTypes = result.data.payload.rows

                        pageState.setLoading(false)
                    })
                    .catch((err) => {
                        // it because authGuard exceptions are not handled in backend
                        console.log(err)

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
                                    .catch((error: any) => {
                                        // refresh token invalid or expired
                                        const pageStore = usePageStore()
                                        pageStore.setShowError(true, error.response.data.errorCode)
                                        authStore.$reset()
                                        pageState.setLoading(false)
                                    })
                            } else {
                                const pageStore = usePageStore()
                                pageStore.setShowError(true, err.response.data.errorCode)
                                // we dont have refreshToken
                                console.log(err)
                            }
                        }
                    })
            } catch (error: any) {
                const pageStore = usePageStore()
                pageStore.setShowError(true, error.response.data.errorCode)
                console.log(error)
            }
        },

        async loadFactoryDetailsList(factoryId: string, page: number) {
            try {
                const pageState = usePageStore()
                pageState.setLoading(true)

                axios({
                    method: 'get',
                    url: `/api/factory_details/${factoryId}`,
                    params: {
                        page
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(async (res) => {
                        //console.log(res.data.payload)

                        this.factoryDetailsList = res.data.payload

                        //console.log('state: ', this.getFactoryDetails)
                        const result = await axios({
                            method: 'get',
                            url: '/api/factorytablecolumns'
                        })

                        //console.log(result)

                        this.factoryColumnTypes = result.data.payload.rows

                        pageState.setLoading(false)
                    })
                    .catch((err) => {
                        // it because authGuard exceptions are not handled in backend

                        console.log(err)

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
                                        this.loadFactoryDetailsList(factoryId, page)
                                        pageState.setLoading(false)
                                    })
                                    .catch((error: any) => {
                                        // refresh token invalid or expired
                                        const pageStore = usePageStore()
                                        pageStore.setShowError(true, error.response.data.errorCode)
                                        authStore.$reset()
                                        pageState.setLoading(false)
                                    })
                            } else {
                                const pageStore = usePageStore()
                                pageStore.setShowError(true, err.response.data.errorCode)
                                // we dont have refreshToken
                                console.log(err)
                            }
                        }
                    })
            } catch (error: any) {
                const pageStore = usePageStore()
                pageStore.setShowError(true, error.response.data.errorCode)
                console.log(error)
            }
        },

        async changeFactoryDetail(factoryDetailId: string, details: any) {
            try {
                const pageState = usePageStore()
                pageState.setLoading(true)

                axios({
                    method: 'put',
                    url: `/api/factory_details/${factoryDetailId}`,
                    data: JSON.stringify({
                        data: details
                    }),
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
                                        //this.loadFactoryList(page)
                                        //this.changeFactoryDetail(factoryDetailId, details)
                                        pageState.setLoading(false)
                                    })
                                    .catch((error: any) => {
                                        // refresh token invalid or expired
                                        const pageStore = usePageStore()
                                        pageStore.setShowError(true, error.response.data.errorCode)
                                        authStore.$reset()
                                        pageState.setLoading(false)
                                    })
                            } else {
                                const pageStore = usePageStore()
                                pageStore.setShowError(true, err.response.data.errorCode)
                                // we dont have refreshToken
                                console.log(err)
                            }
                        }
                    })
            } catch (error: any) {
                const pageStore = usePageStore()
                pageStore.setShowError(true, error.response.data.errorCode)
                console.log(error)
            }
        },

        async changeFactoryInformation(factoryId: string, details: any) {
            try {
                const pageState = usePageStore()
                pageState.setLoading(true)

                axios({
                    method: 'put',
                    url: `/api/factory/${factoryId}`,
                    data: JSON.stringify({
                        data: details
                    }),
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
                                        //this.loadFactoryList(page)
                                        //this.changeFactoryDetail(factoryDetailId, details)
                                        pageState.setLoading(false)
                                    })
                                    .catch((error: any) => {
                                        // refresh token invalid or expired
                                        const pageStore = usePageStore()
                                        pageStore.setShowError(true, error.response.data.errorCode)
                                        authStore.$reset()
                                        pageState.setLoading(false)
                                    })
                            } else {
                                const pageStore = usePageStore()
                                pageStore.setShowError(true, err.response.data.errorCode)
                                // we dont have refreshToken
                                console.log(err)
                            }
                        }
                    })
            } catch (error: any) {
                const pageStore = usePageStore()
                pageStore.setShowError(true, error.response.data.errorCode)
                console.log(error)
            }
        },

        async addColumnFactoryTable(columnName: string, columnType: string) {
            try {
                const pageState = usePageStore()
                pageState.setLoading(true)

                axios({
                    method: 'put',
                    url: `/api/factorytable`,
                    data: JSON.stringify({
                        column_options: {
                            column_name: columnName,
                            column_type: columnType
                        }
                    }),
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
                                        //this.loadFactoryList(page)
                                        //this.changeFactoryDetail(factoryDetailId, details)
                                        pageState.setLoading(false)
                                    })
                                    .catch((error: any) => {
                                        // refresh token invalid or expired
                                        const pageStore = usePageStore()
                                        pageStore.setShowError(true, error.response.data.errorCode)
                                        authStore.$reset()
                                        pageState.setLoading(false)
                                    })
                            } else {
                                const pageStore = usePageStore()
                                pageStore.setShowError(true, err.response.data.errorCode)
                                // we dont have refreshToken
                                console.log(err)
                            }
                        }
                    })
            } catch (error: any) {
                const pageStore = usePageStore()
                pageStore.setShowError(true, error.response.data.errorCode)
                console.log(error)
            }
        },

        async addColumnFactoryDetailsTable(columnName: string, columnType: string) {
            try {
                const pageState = usePageStore()
                pageState.setLoading(true)

                axios({
                    method: 'put',
                    url: `/api/factorydetailstable`,
                    data: JSON.stringify({
                        column_options: {
                            column_name: columnName,
                            column_type: columnType
                        }
                    }),
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
                                        //this.loadFactoryList(page)
                                        //this.changeFactoryDetail(factoryDetailId, details)
                                        pageState.setLoading(false)
                                    })
                                    .catch((error: any) => {
                                        // refresh token invalid or expired
                                        const pageStore = usePageStore()
                                        pageStore.setShowError(true, error.response.data.errorCode)
                                        authStore.$reset()
                                        pageState.setLoading(false)
                                    })
                            } else {
                                const pageStore = usePageStore()
                                pageStore.setShowError(true, err.response.data.errorCode)
                                // we dont have refreshToken
                                console.log(err)
                            }
                        }
                    })
            } catch (error: any) {
                const pageStore = usePageStore()
                pageStore.setShowError(true, error.response.data.errorCode)
                console.log(error)
            }
        },

        async deleteColumnFactoryDetailsTable(columnName: string) {
            try {
                const pageState = usePageStore()
                pageState.setLoading(true)

                axios({
                    method: 'delete',
                    url: `/api/factorydetailstable`,
                    data: JSON.stringify({
                        column_name: columnName
                    }),
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
                                        //this.loadFactoryList(page)
                                        //this.changeFactoryDetail(factoryDetailId, details)
                                        pageState.setLoading(false)
                                    })
                                    .catch((error: any) => {
                                        // refresh token invalid or expired
                                        const pageStore = usePageStore()
                                        pageStore.setShowError(true, error.response.data.errorCode)
                                        authStore.$reset()
                                        pageState.setLoading(false)
                                    })
                            } else {
                                const pageStore = usePageStore()
                                pageStore.setShowError(true, err.response.data.errorCode)
                                // we dont have refreshToken
                                console.log(err)
                            }
                        }
                    })
            } catch (error: any) {
                const pageStore = usePageStore()
                pageStore.setShowError(true, error.response.data.errorCode)
                console.log(error)
            }
        },

        async deleteColumnFactoryTable(columnName: string) {
            try {
                const pageState = usePageStore()
                pageState.setLoading(true)

                axios({
                    method: 'delete',
                    url: `/api/factorytable`,
                    data: JSON.stringify({
                        column_name: columnName
                    }),
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
                                        //this.loadFactoryList(page)
                                        //this.changeFactoryDetail(factoryDetailId, details)
                                        pageState.setLoading(false)
                                    })
                                    .catch((error: any) => {
                                        // refresh token invalid or expired
                                        const pageStore = usePageStore()
                                        pageStore.setShowError(true, error.response.data.errorCode)
                                        authStore.$reset()
                                        pageState.setLoading(false)
                                    })
                            } else {
                                // we dont have refreshToken
                                const pageStore = usePageStore()
                                pageStore.setShowError(true, err.response.data.errorCode)
                                console.log(err)
                            }
                        }
                    })
            } catch (error: any) {
                const pageStore = usePageStore()
                pageStore.setShowError(true, error.response.data.errorCode)
                console.log(error)
            }
        }
    }
})
