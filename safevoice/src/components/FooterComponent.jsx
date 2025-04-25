import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer style={{ backgroundColor: "#f06292", color: "white", padding: "20px 0" }}>
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} SafeVoice. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <Link to="/faq" className="text-white me-3">
              FAQ
            </Link>
            <Link to="/legal-help" className="text-white">
              Legal Help
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
