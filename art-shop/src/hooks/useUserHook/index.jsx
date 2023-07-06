import { createContext, useContext, useEffect, useState } from "react";
import artShopBackendAxios from "../../configs/artShopBackendConfig"

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
        const verifyUser = async () => {
            const tempUser = getUser()
            if (!tempUser) {
                setUser(null) 
                setUserUpdated(false)
                return
            }
            try {
                await artShopBackendAxios.get('/user', {
                    headers: {
                        authorization: `Bearer ${tempUser.token}`
                    }
                })
                setUser(tempUser)   
                setUserUpdated(false)
            } catch (err) {
                setUserUpdated(false)
                console.log(err)
                if (err.response.status === 401 && err.response.data.message === 'Invalid token') {
                    removeUser()
                    return
                } 
                console.log(err)
            }
        }
        verifyUser()
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
        <UserContext.Provider value={{user, storeUser, removeUser, getUser}}>
            {children}
        </UserContext.Provider>
    )
}