import React from "react"
import { Layout, JumboTitle } from "../components/Components"
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default () => {
  return (
    <Layout>
      <Container fluid className="text-center">
        <JumboTitle title="Resume">
          <a href="../../resume.pdf" target="_blank" download>
            <FontAwesomeIcon
              style={{ fontSize: "2rem" }}
              icon={["fas", "file-download"]}
              className="icons"
            />
          </a>
        </JumboTitle>
      </Container>
    </Layout>
  )
}
