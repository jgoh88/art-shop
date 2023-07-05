import {Col, Row, Container} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios"
import Artworks from "../Artworks";

export default function Home({onSelectArt}){

  const [artworks,setArtworks]= useState([]);

  useEffect (()=>{
  axios.get ('http://localhost:4000/').then (res=>{
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