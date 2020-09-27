import React from "react"
import Container from "react-bootstrap/Container"
import { PageLayout, PageTitle } from "../components"

import SEO from "../utils/seo"

export default ({ title, excerpt, html, subTitle }) => (
  <PageLayout>
    <SEO title={title} description={excerpt} />
    <Container className="text-center" fluid>
      <PageTitle title={title} />
      {subTitle}
      <Container className="text-justify p-large">
        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        {!html && <div>This page is currently under development.</div>}
      </Container>
    </Container>
  </PageLayout>
)
