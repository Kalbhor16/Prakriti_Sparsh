import React from 'react'
import { Children } from 'react';
import { createContext } from 'react'
export const authDataContext=createContext();
function AuthContext({children}) {
    let serverUrl="https://prakriti-sparsh-backend.onrender.com"
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
