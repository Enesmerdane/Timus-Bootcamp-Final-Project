import { defineStore } from 'pinia'

export const usePageStore = defineStore('pageState', {
    state: () => ({ loading: false, showErrorView: false }),
    getters: {
        getLoading: (state) => state.loading,
        getErrorView: (state) => state.showErrorView
    },
    actions: {
        setLoading(isLoading: boolean) {
            this.loading = isLoading
        },
        setErrorView(show: boolean) {
            this.showErrorView = show
        }
    }
})
