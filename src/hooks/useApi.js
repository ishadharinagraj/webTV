import { AppContext } from '@/contexts/app';
import axios from 'axios'
import { useContext } from 'react'

const useApi = () => {
    const { user } = useContext(AppContext)


    const makeRequest = () => {
        const { username, password, server, loginType, token } = user
        const headers = {
            username,
            password,
            server,
            type : loginType,
            token
        }
        return {
            get: async (endpoint) => await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
                headers: headers
            }),
            post: async (endpoint, data) => await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}` , data , {
                headers : headers
            }),
        }
    }

    return { makeRequest }
}

export default useApi