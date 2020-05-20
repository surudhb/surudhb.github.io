import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { faBorderNone } from "@fortawesome/free-solid-svg-icons"

export default () => {
  const handleMouseOver = e => {
    console.log(e.target)
  }
  return (
    <footer className={styles.sticky}>
      <Container fluid className="text-center">
        <Row>
          <Col className="text-muted">
            Surudh Bhutani &copy; {new Date().getFullYear()}. Made with{" "}
            <button style={styles.buttonStyle} onMouseOver={handleMouseOver}>
              ❤
            </button>{" "}
            & <a href="https://www.gatsbyjs.org/">Gatsby</a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

const styles = {
  sticky: {
    left: 0,
    bottom: 0,
    width: "100%",
  },
  buttonStyle: {
    color: "cyan",
    border: "none",
    background: "white",
  },
}
