import {Col, Row, Card, Button} from "react-bootstrap";
import React from "react";

export default function Home({onSelectProduct, product, addItemToCart}){

  return (
    <Col md={3} className={"mb-3"}>
    <Card>
      <Card.Img onClick={onSelectProduct} variant="top" src={product.imageURL || "http://placehold.it/200x200"} />
      <Card.Body>
        <Row>
          <Col onClick={onSelectProduct}>
            <div>
              <div className={`fw-bold`}>RM {product.price}</div>
            </div>
            <div>{product.name}</div>
          </Col>
          <Col>
            { product.quantity > 0 ? <Button onClick={addItemToCart}>Add to cart</Button>  : <div>No stock</div>}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
  );
}

<div>Welcome to myArt</div>