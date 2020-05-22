import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import ThemeContext from "../utils/theme-context"
import vaderSound from "../../static/sounds/Darth-Vader.mp3"
import r2d2Sound from "../../static/sounds/R2-D2.mp3"

const vaderAudio = new Audio(vaderSound)
const r2d2Audio = new Audio(r2d2Sound)

export default () => {
  const handleChangeTheme = theme => {
    theme.toggleDark()
    vaderAudio.pause()
    vaderAudio.currentTime = 0
    r2d2Audio.pause()
    r2d2Audio.currentTime = 0
    theme.dark ? r2d2Audio.play() : vaderAudio.play()
  }

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
                  onClick={() => handleChangeTheme(theme)}
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
