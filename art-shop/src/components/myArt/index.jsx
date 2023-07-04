import {Col, Row, Card, Button, Container} from "react-bootstrap";
import React from "react";
import { useUserHook } from "../../hooks/useUserHook"

<div>Welcome to myArt</div>

export default function MyArt({update, remove, add, onSelectArt, art}){

  const userHook = useUserHook()

//   useEffect(() => {
//     if (userHook.user) {
//         navigate('/')
//     }
// }, [userHook.user])

//Access email, name, etc

  return (
    <Container>

      <Row className="mt-3 text-center">
        <Col>
          <h1>My Art Seller Centre</h1>
        </Col>
      </Row>

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
            <Button onClick={update}>Update</Button>
            <Button onClick={remove}>Remove</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>

<Button onClick={add}>Add New Art</Button>
    </Container>
    
  );
}



