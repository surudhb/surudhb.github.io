import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Img from "gatsby-image"

export default ({ images }) => {
    return (
        <Carousel className="p-2" interval="2000" style={{width:"100%"}}>
            {images.map((image => (
                <Carousel.Item key={image}>
                    <Img
                        fluid={image}
                        className="m-auto"
                        style={{height: 'calc(40vh - 4rem)'}}
                        imgStyle={{objectFit: 'contain'}}
                    />
                </Carousel.Item>
            )))}
        </Carousel>
    )
}
