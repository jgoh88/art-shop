import {Col, Row, Card, Button } from "react-bootstrap";
import ArtworksDetailsModal from "../ArtworksDetailsModal";
import { useCartHook } from "../../hooks/useCartHook";
import { useUserHook } from "../../hooks/useUserHook";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Artworks({ artworks }) {
    const userHook = useUserHook()
    const cartHook = useCartHook()

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{576: 1, 768: 2, 992: 3, 1200:4}}
        >
            <Masonry gutter="15px">
                {artworks.map((artwork) => {
                return(
                    <Col md={3} key={artwork._id} style={{ width: "100%" }}>
                        <Card>
                        <Card.Img variant="top" src={artwork.img || "https://www.thesprucepets.com/thmb/j86Zss9kZEIXa54FcOQaR7eCmfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg"} />
                        <Card.Body>
                            <Row>
                            <Col>
                                <div>{artwork.name}</div>
                                <div className={`fw-bold`}>RM {artwork.price}</div>
                            </Col>
                            <Col>
                                <ArtworksDetailsModal artwork={artwork} />
                                {artwork.quantity > 0 
                                ? !userHook.user 
                                    ? ''
                                    : <Button className="mt-1" onClick={() => cartHook.addArtToCart(artwork._id.toString())}>Add to cart</Button>  
                                : <div>No stock</div>}
                            </Col>
                            </Row>
                        </Card.Body>
                        </Card>
                    </Col> 
                )})}
            </Masonry>
        </ResponsiveMasonry>
    )
}