import { createContext, useContext, useState, useEffect } from "react";
import { useUserHook } from "../../hooks/useUserHook";
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import { Toast } from "react-bootstrap";

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
    const [message, setMessage] = useState('')

    const [showMessage, setShowMessage] = useState(false);
    const toggleShowToast = () => setShowMessage(!showMessage)

    useEffect(() => {
        const fetchCartData = async () => {
            if (!userHook.user) {
                return
            }
            try {
                const res = await artShopBackendAxios.get('/cart', {
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

    useEffect(() => {
        if (!message) {
            return
        }
        toggleShowToast()
        setTimeout(() => {
            setShowMessage(false)
            setMessage('')
        }, 2000)
    }, [message])

    async function addArtToCart(artworkId) {
        try {
          await artShopBackendAxios.post('/cart', {artworkId: artworkId} ,{
            headers: {
                authorization: `Bearer ${userHook.user.token}`
            }
          })
          setCartUpdated(true)
          setMessage('Added to cart')
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'Artwork already in cart') {
                setMessage('Item already in cart')
            }
            console.log(err)
        }
    }
    
    return (
        <CartContext.Provider value={{cart, setCart, cartUpdated, setCartUpdated, addArtToCart}}>
            <Toast show={showMessage} style={{position: 'fixed', zIndex: 5, textAlign: 'center', top: "5%", left: "50%", transform: "translateX(-50%)"}}>
                <Toast.Body className="fw-medium fs-6">{message}</Toast.Body>
            </Toast>
            {children}
        </CartContext.Provider>
    )
}