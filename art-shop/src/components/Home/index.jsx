import {Col, Row, Container} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import Artworks from "../Artworks";

export default function Home(){

  const [artworks,setArtworks]= useState([]);

  useEffect (()=>{
    artShopBackendAxios.get('/').then (res=>{
      setArtworks (res.data.artwork)
    })
  }, [])

  return (
    <Container>
      <Row className="mt-3 text-center">
        <Col>
          <h1>Art Shop Gallery</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Artworks artworks={artworks} />
      </Row>  
    </Container>
  );
}