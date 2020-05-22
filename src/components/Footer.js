import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import ThemeContext from "../utils/theme-context"

export default () => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <footer className={styles.sticky}>
          <Container fluid className="text-center">
            <Row>
              <Col className="text-muted">
                Surudh Bhutani &copy; {new Date().getFullYear()}. Made with{" "}
                <Button
                  className="p-0"
                  variant={theme}
                  style={{
                    color: `${theme.dark ? "maroon" : "#008cff"}`,
                    backgroundColor: "rgba(0,0,0,0)",
                    border: "none",
                  }}
                  onClick={theme.toggleDark}
                >
                  ❤
                </Button>{" "}
                &{" "}
                <a
                  className="p-0"
                  style={{ color: `${theme.dark ? "maroon" : "#008cff"}` }}
                  href="https://www.gatsbyjs.org/"
                >
                  Gatsby
                </a>
              </Col>
            </Row>
          </Container>
        </footer>
      )}
    </ThemeContext.Consumer>
  )
}

const styles = {
  sticky: {
    left: 0,
    bottom: 0,
    width: "100%",
  },
}
