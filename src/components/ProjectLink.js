import React from "react"
import { Link } from "gatsby"
import { Badge, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Karousel from "./Karousel"

export default ({ featuredImages, tags, github, live, title, to }) => (
  <div className="col-12 col-lg-4 text-center project-container m-4">
    <Karousel images={featuredImages} style={{height: "60%"}} />
    <Link className="text-decoration-none" to={to}>
      <h3 className="mt-3">
        <p>{title}</p>
      </h3>
    </Link>
    <div className="d-block">
      {tags.map(tag => (
        <Badge
          key={tag.concat(Math.random())}
          pill
          className="m-1 py-1 px-2 resume-tags"
        >
          <h5 style={{fontSize: "0.9rem"}} className="m-auto">{tag}</h5>
        </Badge>
      ))}
    </div>
    <br />
    <div className="d-inline-flex">
      {live && (
        <Button className="see-live-button rounded-pill mx-md-2 px-md-3 pb-md-1">
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
          >
            <FontAwesomeIcon icon={["fa", "window-maximize"]} />
            &nbsp;See me live&nbsp;&nbsp;
            <FontAwesomeIcon icon={["fa", "link"]} />
          </a>
        </Button>
      )}
      {github && (
        <Button variant="dark" className="mx-2 px-3 pb-1">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
          >
            <FontAwesomeIcon icon={["fab", "github"]} />
            &nbsp;Github&nbsp;&nbsp;
            <FontAwesomeIcon icon={["fa", "link"]} />
          </a>
        </Button>
      )}
    </div>
  </div>
)
