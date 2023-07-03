import { createContext, useContext, useEffect, useState } from "react";

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
            setUserUpdated(false)
        }
    }, [userUpdated])

    function storeUser(usr) {
        setUserUpdated(true)
        sessionStorage.setItem('user', JSON.stringify(usr))
    }

    function getUser() {
        const storageUser = sessionStorage.getItem('user')
        return JSON.parse(storageUser)
    }

    return (
        <UserContext.Provider value={{user, storeUser}}>
            {children}
        </UserContext.Provider>
    )
}