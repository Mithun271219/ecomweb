import React from 'react'
import Image from 'next/image'

function ImageCollection({ images, title }) {
    return (
        <>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" >
                <div className="carousel-inner">
                    {
                        images.map((image, index) => {
                            return (
                                <div key={Math.floor(Math.random() * 100000)} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                    <Image priority className='carousel-image d-block w-100' width={500} height={400} src={image} alt={title} />
                                </div>
                            )
                        })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next"  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default ImageCollection