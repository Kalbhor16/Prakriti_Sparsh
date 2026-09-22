import React from 'react'
import { Children } from 'react';
import { createContext } from 'react'
export const authDataContext=createContext();
function AuthContext({children}) {
  let serverUrl=import.meta.env.VITE_SERVER_URL || (import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://prakriti-sparsh-backend.onrender.com")
    let value={
        serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
