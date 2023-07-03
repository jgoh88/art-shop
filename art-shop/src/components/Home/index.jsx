import {Col, Row, Card, Button} from "react-bootstrap";
import React from "react";

export default function Home({onSelectProduct, product, addItemToCart}){

  return (
    <Col md={3} className={"mb-3"}>
    <Card>
      <Card.Img onClick={onSelectProduct} variant="top" src={product.imageURL || "https://img.freepik.com/premium-vector/cute-hamster-illustration-hamster-kawaii-chibi-vector-drawing-style-hamster-cartoon_622550-41.jpg?w=740"} />
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