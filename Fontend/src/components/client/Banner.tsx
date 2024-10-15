import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };

  const images = [
    'https://picsum.photos/1200/400?random=1',
    'https://picsum.photos/1200/400?random=2',
    'https://picsum.photos/1200/400?random=3',
    'https://picsum.photos/1200/400?random=4',
    'https://picsum.photos/1200/400?random=5',
  ];

  return (
    <div className="banner" style={{ paddingTop: 'var(--header-height)' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Banner ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;