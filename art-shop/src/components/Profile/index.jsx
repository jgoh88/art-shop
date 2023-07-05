import {Col, Row, Card, Container} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios"
import { useUserHook } from "../../hooks/useUserHook"
import UpdateModalComponent from "../UpdateModal";

export default function Profile({update, add, onSelectArt}){

const userHook = useUserHook()
const [userInfos,setUserInfos]= useState([]);
const [updated,setUpdated]= useState(false);

useEffect (()=>{
  if (userHook.user === null) {return }
 axios.get ('http://localhost:4000/profile', {
  headers: {
      authorization: `Bearer ${userHook.user.token}`
  }
}
).then (res=>{
    setUserInfos (res.data.userinfo)
  })
  setUpdated(false)
},[updated,userHook.user])


  return (
<Container>
<Row className="mt-3 text-center">
  <Col>
    <h1>Profile Page</h1>
  </Col>
</Row>

<Row>

{userInfos.map((prof) => {
 return(
 <Card>
   <Card.Img variant="top" src={prof.profilePic || "https://www.thesprucepets.com/thmb/j86Zss9kZEIXa54FcOQaR7eCmfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg"} />
   <Card.Body>
     <Row>
       <Col>
         <div>Username: {prof.username}</div>
         <div>Full Name: {prof.fullName}</div>
         <div>Email: {prof.email}</div>
         <div>Contact Number: {prof.contactNo}</div>
         <div>Address: {prof.address}</div>
       </Col>
       <Col>
         {/* <UpdateModalComponent 
         name={artwork.name}
         price={artwork.price}
         description={artwork.description}
         quantity={artwork.quantity}
         pic={artwork.img}
         setupdated={setUpdated}
         id={artwork._id}
         /> */}
       </Col>
     </Row>
   </Card.Body>
 </Card>
)})}
</Row>
  </Container>



  );
}