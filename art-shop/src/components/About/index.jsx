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
                <Col xs={7} className="text-justify fw-medium">
                    <p>ArtShop is a platform for connecting aspiring and experienced artists with art enthusiasts and collectors. Using our platform, artists can publish arts and details from their work in a polished, professional-looking online gallery, to promote their artwork.</p>
                    <p>Our mission is to help grow the art community and how gives us the ability to express ourselves. Through that expression, artists communicate by drawing on their own unique emotions, thoughts and experiences. These artworks can then be enjoyed by other as they see the world through the artists' eyes.</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                    <img src="https://res.cloudinary.com/douu5ba5m/image/upload/v1688723290/GAProject3ArtShop/anpq0jbm3p2b79dn0dqe.webp" alt="Looking at art"/>
                </Col>
            </Row>
      </Container>
    )
}