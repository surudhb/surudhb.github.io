import React from "react"
import { Layout, JumboTitle } from "../components/Components"
import { Container } from "react-bootstrap"

export default () => {
  return (
    <Layout>
      <Container fluid className="pt-2 mt-5">
        <JumboTitle title="404: Not Found" />
      </Container>
    </Layout>
  )
}
