import {Col, Row, Card, Button} from "react-bootstrap";
import React from "react";

export default function Home({onSelectArt, art, addArtToCart}){

  return (
    <Col md={3} className={"mb-3"}>
    <Card>
      <Card.Img onClick={onSelectArt} variant="top" src={art.imageURL || "http://placehold.it/200x200"} />
      <Card.Body>
        <Row>
          <Col onClick={onSelectArt}>
            <div>
              <div className={`fw-bold`}>RM {art.price}</div>
            </div>
            <div>{art.name}</div>
          </Col>
          <Col>
            { art.quantity > 0 ? <Button onClick={addArtToCart}>Add to cart</Button>  : <div>No stock</div>}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
  );
}