import {Col, Row, Card, Button, Container} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios"

export default function Home({onSelectArt, artwork, addArtToCart}){

const [artworks,setArtworks]= useState([]);

useEffect (()=>{
 axios.get ('http://localhost:4000/').then (res=>{
    console.log (res.data)
    setArtworks (res.data.artwork)
  })
},[])

  return (

  <Container>
<Row className="mt-3 text-center">
  <Col>
    <h1>Art Shop Gallery</h1>
  </Col>
</Row>

<Row>
{artworks.map((artwork) => {
 return(
 <Col md={3} className={"mb-3"}>
 <Card>
   <Card.Img onClick={onSelectArt} variant="top" src={artwork.img || "https://www.thesprucepets.com/thmb/j86Zss9kZEIXa54FcOQaR7eCmfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg"} />
   <Card.Body>
     <Row>
       <Col onClick={onSelectArt}>
         <div>
           <div className={`fw-bold`}>RM {artwork.price}</div>
         </div>
         <div>{artwork.name}</div>
       </Col>
       <Col>
         { artwork.quantity > 0 ? <Button onClick={addArtToCart}>Add to cart</Button>  : <div>No stock</div>}
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