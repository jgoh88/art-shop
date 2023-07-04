import { createContext, useContext, useState, useEffect } from "react";
import { useUserHook } from "../../hooks/useUserHook";
import axios from "axios";

const CartContext = createContext()

export function useCartHook() {
    if (!CartContext) {
        throw new Error("You must use inside CartContext.Provider")
    }
    return useContext(CartContext)
}

export function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const userHook = useUserHook()
    const [cartUpdated, setCartUpdated] = useState(false)

    useEffect(() => {
        const fetchCartData = async () => {
            if (!userHook.user) {
                return
            }
            try {
                const res = await axios.get('http://localhost:4000/cart', {
                    headers: {
                        authorization: `Bearer ${userHook.user.token}`
                    }
                })
                if (res.status === 200) {
                    const tempCart = res.data
                    setCart(tempCart)
                    setCartUpdated(false)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchCartData()
    }, [userHook.user, cartUpdated])

    async function addArtToCart(artworkId) {
        try {
          await axios.post('http://localhost:4000/cart', {artworkId: artworkId} ,{
            headers: {
                authorization: `Bearer ${userHook.user.token}`
            }
          })
          setCartUpdated(true)
        } catch (err) {
          console.log(err)
        }
    }
    
    return (
        <CartContext.Provider value={{cart, setCart, setCartUpdated, addArtToCart}}>
            {children}
        </CartContext.Provider>
    )
}