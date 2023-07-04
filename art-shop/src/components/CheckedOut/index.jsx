import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CheckedOut() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => navigate('/'), 5000) 
    }, [])

    return (
        <Container>
                <Row className="mt-3 text-center">
                    <Col>
                        <h1>Checkout Successful</h1>
                    </Col>
                </Row>
                <Row className="mt-3 text-center">
                    <Col>
                        <p>You have successfully checkeded out. Thank you for shopping with ArtShop</p>
                        <p>Thank you and see you again!</p>
                        <p className="mt-5">You'll be redirected to Home page</p>
                    </Col>
                </Row>
        </Container>
    )
}