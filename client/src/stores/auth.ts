import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('counter', {
    state: () => ({ userId: null }),
    getters: {
        getUserId: (state) => state.userId
    },
    actions: {
        async login(email: string, password: string) {
            try {
                //const result = await axios.get('api/auth/login', { email, password })
                const result = await axios({
                    method: 'post',
                    url: '/api/auth/login',
                    data: JSON.stringify({
                        email: 'enes2@gmail.com',
                        password: '12312312'
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
    }
})
