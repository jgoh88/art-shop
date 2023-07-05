import {Col, Row, Card, Button } from "react-bootstrap";
import DetailedPostModalComponent from "../DetailedPostModal";
import { useCartHook } from "../../hooks/useCartHook";
import { useUserHook } from "../../hooks/useUserHook";

export default function Artworks({ artworks }) {
    const userHook = useUserHook()
    const cartHook = useCartHook()

    return (
        <>
            {artworks.map((artwork) => {
            return(
                <Col md={3} className={"mb-3"} key={artwork._id}>
                    <Card>
                    <Card.Img variant="top" src={artwork.img || "https://www.thesprucepets.com/thmb/j86Zss9kZEIXa54FcOQaR7eCmfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg"} />
                    <Card.Body>
                        <Row>
                        <Col>
                            <div>
                            <div className={`fw-bold`}>RM {artwork.price}</div>
                            </div>
                            <div>{artwork.name}</div>
                        </Col>
                        <Col>
                        <DetailedPostModalComponent 
                        name={artwork.name}
                        price={artwork.price}
                        description={artwork.description}
                        img={artwork.img}
                        />
                            { artwork.quantity > 0 
                            ? !userHook.user 
                                ? ''
                                : <Button onClick={() => cartHook.addArtToCart(artwork._id.toString())}>Add to cart</Button>  
                            : <div>No stock</div>}
                        </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                </Col> 
            )})}
        </>
    )
}