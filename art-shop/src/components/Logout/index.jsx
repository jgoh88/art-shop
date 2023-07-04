import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserHook } from "../../hooks/useUserHook";
import { Col, Container, Row } from "react-bootstrap";

export default function Logout() {
    const {token} = useParams()
    const navigate = useNavigate()
    const [loggedOut, setLoggedOut] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const userHook = useUserHook()

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const res = await axios.get('http://localhost:4000/user', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                if (res.status === 200) {
                    userHook.removeUser()
                    setLoggedOut(true)
                    setTimeout(() => navigate('/'), 5000) 
                }
            } catch (err) {
                console.log(err)
                setErrorMessage('Error encountered while logging out')
            } 
        }
        logoutUser()
    }, [])

    return (
        <div>
            {loggedOut  
            ? <Container>
                <Row className="mt-3 text-center">
                    <Col>
                        <h1>Logout from account</h1>
                    </Col>
                </Row>
                <Row className="mt-3 text-center">
                    <Col>
                        <p>You have successfully logged out.</p>
                        <p>Thank you and see you again!</p>
                        <p className="mt-5">You'll be redirected to Home page</p>
                    </Col>
                </Row>
            </Container>
            : errorMessage === '' ? ''
            : <Container>
                <Row className="mt-3 text-center">
                    <Col>
                        <h1>Logout from account</h1>
                    </Col>
                </Row>
                <Row className="mt-3 text-center">
                    <Col>
                        <p>{errorMessage}</p>
                    </Col>
                </Row>
            </Container>
            }
        </div>
    )
}