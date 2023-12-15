import { defineStore } from 'pinia'

export const usePageStore = defineStore('pageState', {
    state: () => ({ loading: false }),
    getters: {
        getLoading: (state) => state.loading
    },
    actions: {
        setLoading(isLoading: boolean) {
            this.loading = isLoading
        }
    }
})
