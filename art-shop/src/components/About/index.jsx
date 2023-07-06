import {Col, Row, Container} from "react-bootstrap";

export default function About() {
    return (
        <Container>
            <Row className="mt-3 text-center">
                <Col>
                    <h1>About ArtShop</h1>
                </Col>
            </Row>
            <Row className="mt-4 d-flex justify-content-center">
                <Col xs={3} className="text-center fw-medium" style={{width: "80%"}}>
                    <p className="">ArtShop is a platform for connecting aspiring and experienced artists with art enthusiasts and collectors. Artists can publish arts and details from their work in a polished, professional-looking online gallery, to promote their artwork.</p>
                    <p></p>
                </Col>
            </Row>  
      </Container>
    )
}