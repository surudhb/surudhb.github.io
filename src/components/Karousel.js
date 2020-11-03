import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Img from "gatsby-image"

export default ({ images }) => {
    return (
        <Carousel interval={2000} className="m-1">
            {images.map((image => (
                <Carousel.Item key={Math.random()}>
                    <Img
                        fluid={image}
                        imgStyle={{objectFit: 'contain'}}
                        style={{height: "15rem"}}
                    />
                </Carousel.Item>
            )))}
        </Carousel>
    )
}
