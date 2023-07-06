import {Col, Row, Card, Container} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import { useUserHook } from "../../hooks/useUserHook"
import UpdateModalComponent from "../UpdateModal";
import AddModalComponent from "../AddModal";
import RemoveModalComponent from "../RemoveModal";

export default function MyArt({update, add, onSelectArt}){

const userHook = useUserHook()
const [artworks,setArtworks]= useState([]);
const [updated,setUpdated]= useState(false);

useEffect (()=>{
  if (userHook.user === null) {return }
  artShopBackendAxios.get('/myart', {
  headers: {
      authorization: `Bearer ${userHook.user.token}`
  }
}
).then (res=>{
    console.log (res.data)
    setArtworks (res.data.artwork)
  })
  setUpdated(false)
},[updated,userHook.user])


  return (
<Container>
<Row className="mt-3 text-center">
  <Col>
    <h1>My Art Seller Centre</h1>
  </Col>
</Row>

<Row className="text-center">
  <Col>
  <AddModalComponent
     setupdated={setUpdated}
  />
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
         <UpdateModalComponent 
         name={artwork.name}
         price={artwork.price}
         description={artwork.description}
         quantity={artwork.quantity}
         pic={artwork.img}
         setupdated={setUpdated}
         id={artwork._id}
         />
        <RemoveModalComponent 
        id={artwork._id}
        setupdated={setUpdated}
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