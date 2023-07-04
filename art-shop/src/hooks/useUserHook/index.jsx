import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext()

export function useUserHook() {
    if (!UserContext) {
        throw new Error("You must use inside UserContext.Provider")
    }
    return useContext(UserContext)
}

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [userUpdated, setUserUpdated] = useState(false)

    useEffect(() => {
        const tempUser = getUser()
        if (tempUser) {
            setUser(tempUser)   
        } else {
            setUser(null)  
        }
        setUserUpdated(false)
    }, [userUpdated])

    function storeUser(usr) {
        setUserUpdated(true)
        localStorage.setItem('user', JSON.stringify(usr))
    }

    function getUser() {
        const storageUser = localStorage.getItem('user')
        return JSON.parse(storageUser)
    }

    function removeUser() {
        setUserUpdated(true)
        localStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{user, storeUser, removeUser}}>
            {children}
        </UserContext.Provider>
    )
}