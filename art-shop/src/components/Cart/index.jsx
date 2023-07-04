import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CloseButton, Button, Modal } from "react-bootstrap";
import { useUserHook } from "../../hooks/useUserHook";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([])
    const [unavailableCartItems, setUnavailableCartItems] = useState([])
    const [cartUpdated, setCartUpdated] = useState(false)
    const userHook = useUserHook()
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setUnavailableCartItems([])
    };
    const handleShow = () => setShow(true);

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

    useEffect(() => {
        if (unavailableCartItems.length === 0) {
            return
        }
        handleShow()
    }, [unavailableCartItems])

    async function onDeleteClickHandler(artworkId) {
        try {
            const res = await axios.delete('http://localhost:4000/cart', {
                data: {artworkId: artworkId},
                headers: {
                    authorization: `Bearer ${userHook.user.token}`
                }
            })
            if (res.status === 200) {
                setCartUpdated(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function onCheckoutClickHandler() {
        try {
            const res = await axios.get('http://localhost:4000/cart/checkout', {
                headers: {
                    authorization: `Bearer ${userHook.user.token}`
                }
            })
            if (res.status === 200) {
                const res = await axios.post('http://localhost:4000/cart/checkout', {}, {
                    headers: {
                        authorization: `Bearer ${userHook.user.token}`
                    }
                })
                if (res.status === 200) {
                    navigate('/cart/checkout')
                }
            }
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'Artwork sold or removed') {
                setUnavailableCartItems(err.response.data.unavailableArtwork)
                return
            }
            console.log(err)
        }
    }

    return (
        <Container>
            <Row className="mt-3 text-center">
                <Col>
                    <h1>Shopping Cart</h1>
                </Col>
            </Row>
            <Row className="mt-3 fw-medium fs-5">
                <Col md={8} className="text-center">Artwork</Col>
                <Col md={1} className="text-end">Artist</Col>
                <Col md={2} className="text-end">Price</Col>
            </Row>
            <Row>
                {cart.length === 0
                ? <Card className="mt-5 border-dark text-center">
                    <Card.Body>
                        <p className="fw-medium fs-3">No items in cart</p>
                    </Card.Body>
                </Card> 
                : cart.map(cartItem => {
                    return (
                        <Card className="mt-3 border-dark" key={cartItem._id}>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <Card.Img src={cartItem.img} />
                                    </Col>
                                    <Col md={4}>
                                        <p><span className="fw-medium">Name:</span><br/>{cartItem.name}</p>
                                        <p><span className="fw-medium">Description:</span><br/>{cartItem.description}</p>
                                    </Col>
                                    <Col md={1} className="text-end">{cartItem.createdBy.user.fullName}</Col>
                                    <Col md={2} className="text-end pe-0">RM {cartItem.price}</Col>
                                    <Col md={1} className="d-flex justify-content-end"><CloseButton onClick={() => onDeleteClickHandler(cartItem._id.toString())} /></Col>
                                </Row>
                            </Card.Body>
                        </Card>                        
                    )
                })}
            </Row>
            {cart.length === 0 ? ''
            : <Row className="mt-4 text-end">
                <Col>
                    <p className="fs-4"><span className="fw-bold">Total</span> RM {cart.reduce((t, c) => t + c.price, 0)}</p>
                    <Button variant="secondary" className="fw-medium mb-3 fs-5" onClick={onCheckoutClickHandler}>
                        Checkout
                    </Button>
                </Col>
            </Row>
            }
            <Modal 
                size="lg"
                centered
                show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Artwork no longer available</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    We are deeply sorry, however it seems the following {'artwork(s)'} are no longer available. Please remove them from the cart before proceeding.
                    <Container>
                        {unavailableCartItems.map((cartItem) => {
                            return (
                                <Card className="mt-3 border-dark" key={cartItem._id}>
                                    <Card.Body>
                                        <Row>
                                            <Col md={4}>
                                                <Card.Img src={cartItem.img} />
                                            </Col>
                                            <Col md={8}>
                                                <p><span className="fw-medium">Name:</span><br/>{cartItem.name}</p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>                        
                            )
                        })}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Okay
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}