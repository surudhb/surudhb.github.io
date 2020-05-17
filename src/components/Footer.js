import React from "react"
import { Container, Row, Col } from "react-bootstrap"

export default () => (
  <footer className={styles.sticky}>
    <Container fluid className="text-center">
      <Row>
        <Col className="text-muted">
          Surudh Bhutani &copy; {new Date().getFullYear()}. Made with{" "}
          <span style={{ color: "cyan" }}>❤</span> &{" "}
          <a href="https://www.gatsbyjs.org/">Gatsby</a>
        </Col>
      </Row>
    </Container>
  </footer>
)

const styles = {
  sticky: {
    left: 0,
    bottom: 0,
    width: "100%",
  },
}
