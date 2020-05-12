import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import footerStyles from "./footer.module.scss"

export default () => (
  <footer className={footerStyles.sticky}>
    <Container fluid className="text-center">
      <Row>
        <Col className="text-muted">
          Surudh Bhutani &copy; {new Date().getFullYear()}. Made with{" "}
          <span style={{ color: "red" }}>❤</span> &{" "}
          <a href="https://www.gatsbyjs.org/">Gatsby</a>
        </Col>
      </Row>
    </Container>
  </footer>
)
