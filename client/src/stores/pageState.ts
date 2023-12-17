import { defineStore } from 'pinia'

export const usePageStore = defineStore('pageState', {
    state: () => ({
        loading: false,
        showError: false,
        errorMessage: ''
    }),
    getters: {
        getLoading: (state) => state.loading,
        getShowError: (state) => state.showError,
        getErrorMessage: (state) => state.errorMessage
    },
    actions: {
        setLoading(isLoading: boolean) {
            this.loading = isLoading
        },
        setShowError(val: boolean, message?: string) {
            if (val && message) {
                this.showError = val
                this.errorMessage = message
            } else {
                this.showError = val
            }
            this.showError = val
        }
    }
})
