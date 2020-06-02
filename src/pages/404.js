import React from "react"
import { Layout, JumboTitle } from "../components"
import { Container } from "react-bootstrap"
import SEO from "../utils/seo"

export default () => (
  <Layout>
    <SEO title="404: Not Found" />
    <Container fluid className="pt-2 mt-5 text-center">
      <JumboTitle title="404: Not Found" />
    </Container>
  </Layout>
)
