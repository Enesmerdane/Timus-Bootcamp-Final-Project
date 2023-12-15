import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('counter', {
    state: () => ({ userId: null, userName: null }),
    getters: {
        getUserId: (state) => state.userId,
        getUserName: (state) => state.userName
    },
    actions: {
        async login(email: string, password: string) {
            try {
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
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        },
        async register(email: string, password: string, username: string, role: number) {
            try {
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
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        },
        accessCookies(){
            console.log();
            
        }
    }
})
