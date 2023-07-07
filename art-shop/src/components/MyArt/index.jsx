import {Col, Row, Card, Container} from "react-bootstrap";
import { useEffect, useState } from "react";
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import { useUserHook } from "../../hooks/useUserHook"
import MyArtAddModal from "../MyArtAddModal";
import MyArtEditModal from "../MyArtEditModal";
import MyArtRemoveModal from "../MyArtRemoveModal";

export default function MyArt(){

    const userHook = useUserHook()
    const [artworks,setArtworks]= useState([]);
    const [artworkUpdated,setArtworkUpdated]= useState(false);

    useEffect (()=>{
        if (userHook.user === null) {return}
        artShopBackendAxios.get('/myart', {
            headers: {
                authorization: `Bearer ${userHook.user.token}`
            }
        })
        .then (res=>{
            setArtworks (res.data.artwork)
        })
        .catch(err => {
            console.log(err)
        })
        setArtworkUpdated(false)
    },[artworkUpdated, userHook.user])

    return (
        <Container>
            <Row className="mt-3 text-center">
                <Col>
                    <h1>My Art Seller Centre</h1>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end">
                    <MyArtAddModal setArtworkUpdated={setArtworkUpdated} /> 
                </Col>
            </Row>
            <Row className="mt-3">
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
                                        <MyArtEditModal
                                            artwork={artwork}
                                            setArtworkUpdated={setArtworkUpdated}
                                        />
                                        <MyArtRemoveModal
                                            artwork={artwork}
                                            setArtworkUpdated={setArtworkUpdated}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col> 
                )})}
            </Row>
        </Container>
    );
}