import { defineStore } from 'pinia'

export const usePageStore = defineStore('pageState', {
    state: () => ({
        loading: false,
        showError: false,
        errorMessage: ''
    }),
    persist: true,
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
            }
            this.showError = val
        }
    }
})
