import React from "react"
import Img from "gatsby-image"
import Container from "react-bootstrap/Container"

export default ({ frontmatter, image }) => {
  const {
    company,
    slug,
    position,
    link,
    startDate,
    endDate,
    location,
  } = frontmatter
  return (
    <Container fluid className="m-auto">
      <a
        className="text-decoration-none"
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        {image && (
          <Img
            fluid={image}
            style={{
              maxHeight: "17vmax",
              maxWidth: "17vmax",
              borderRadius: company !== "Royal Victoria Hospital" && "50%",
            }}
            className="m-auto"
          />
        )}
      </a>
      <div>
        {slug ? (
          <>
            <h3 className="m-auto pt-2 nav-links">
              <a
                className="text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
                href={link}
              >
                <span class={slug}>{company}</span>
              </a>
            </h3>
            <h4 className="mt-2">
              <small>
                <span>{position}</span>
              </small>
            </h4>
            <p className="text-muted">
              {startDate}-{endDate}
            </p>
          </>
        ) : (
          <>
            <h2 className="m-auto pt-2 nav-links">
              <a
                className="text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
                href={link}
              >
                <span class={slug}>{company}</span>
              </a>
            </h2>
            <h5 className="text-muted">{location}</h5>
            <h4 className="mt-2">{position}</h4>
            <h5 className="text-muted mt-2">
              {startDate}-{endDate}
            </h5>
          </>
        )}
      </div>
    </Container>
  )
}
