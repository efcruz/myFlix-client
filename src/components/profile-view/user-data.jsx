import React from "react";
import { Col, Row, Card } from "react-bootstrap";

export function UserData(props) {
  const userdata = props.userdata
  return (
    <Col lg={12}>
      <Row>
        <Card className="bg-light text-black" border='danger' style={{ textAlign: 'center', marginTop: 20 }}>
      
          <Card.Title style={{marginTop: 10}} >Profile Card</Card.Title>
          <Card.Body className="bg-light text-black" border='danger' style={{ textAlign: 'left', marginTop: 20 }}>
          <p>Username: {userdata.Username}</p>
          <p>Email: {userdata.Email}</p>
          <p>Birthday: {userdata.Birthday}</p>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  )
}