import {Col, Row, Card, Container} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import { useUserHook } from "../../hooks/useUserHook"
import EditProfileComponent from "../EditProfile";

export default function Profile({update, add, onSelectArt}){

  const userHook = useUserHook()
  const [userInfo, setUserInfo]= useState([]);
  const [updated, setUpdated]= useState(false);

  useEffect (()=>{
    if (userHook.user === null) {return }
    artShopBackendAxios.get('/profile', {
      headers: {
          authorization: `Bearer ${userHook.user.token}`
      }
    })
      .then (res => setUserInfo(res.data.userinfo))
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
        <Col>
          <Card>
            <Card.Img variant="top" className = 'center mt-3' height='200px' width='200px' src={userInfo.profilePic || "https://www.thesprucepets.com/thmb/j86Zss9kZEIXa54FcOQaR7eCmfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg"} />
            <Card.Body>
              <Col>
                <Row>
                  <Col className = 'mt-3 justify-content-center'>
                    <div>Username: {userInfo.username}</div>
                    <div>Full Name: {userInfo.fullName}</div>
                    <div>Email: {userInfo.email}</div>
                    <div>Contact Number: {userInfo.contactNo}</div>
                    <div>Address: {userInfo.address}</div>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                      <EditProfileComponent 
                        username={userInfo.username}
                        fullName={userInfo.fullName}
                        email={userInfo.email}
                        contactNo={userInfo.contactNo}
                        address={userInfo.address}
                        profilePic={userInfo.profilePic}
                        setupdated={setUpdated}
                        id={userInfo._id}
                      />
                  </Col>
                </Row>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}