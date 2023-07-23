import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MovieCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel showStatus={false} showIndicators={false} infiniteLoop>
        <div>
          <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1688970894022_bigweb.jpg" alt="Movie 1" />
        </div>
        <div>
          <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1689943177299_bassidesktop.jpg" alt="Movie 2" />
        </div>
        <div>
          <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1689317595041_gauravguptaliivedesktop.jpg" alt="Movie 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
