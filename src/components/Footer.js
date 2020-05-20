import React from "react"
import { Container, Row, Col } from "react-bootstrap"

export default ({ handler, themeClass }) => {
  const heart = themeClass === "theme-rebellion" ? "cyan" : "red"
  return (
    <footer className={styles.sticky}>
      <Container fluid className="text-center">
        <Row>
          <Col className="text-muted">
            Surudh Bhutani &copy; {new Date().getFullYear()}. Made with{" "}
            <button
              style={{ color: `${heart}` }}
              onMouseOver={handler}
              onFocus={handler}
            >
              ❤
            </button>{" "}
            &{" "}
            <a style={{ color: `${heart}` }} href="https://www.gatsbyjs.org/">
              Gatsby
            </a>
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
}
