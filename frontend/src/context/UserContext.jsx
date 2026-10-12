import React, { createContext, useCallback, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext';
import { useContext } from 'react';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { serverUrl } = useContext(authDataContext)
    const getCurrentUser = useCallback(async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, { withCredentials: true })
            setUserData(result.data)
            return result.data
        } catch {
            setUserData(null)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [serverUrl])

    useEffect(() => {
        const interceptorId = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 && error.config?.url?.startsWith(serverUrl)) {
                    setUserData(null)
                }
                return Promise.reject(error)
            }
        )
        getCurrentUser()
        return () => axios.interceptors.response.eject(interceptorId)
    }, [getCurrentUser, serverUrl])

    const value = {
        userData,
        setUserData,
        getCurrentUser,
        isLoading,
    }
    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext