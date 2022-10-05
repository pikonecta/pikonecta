import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper";
import "./styles.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function Carrousel({ imgs }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="carrousel">
      <Swiper
        tag="section"
        wrapperTag="ul"
        loop
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        enabled
        className="carrouselPrincipal"
      >
        {imgs?.map((img) => (
          <SwiperSlide tag="li" key={img}>
            <img src={img} alt="alt" />
          </SwiperSlide>
        ))}
      </Swiper>
      {imgs?.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          tag="section"
          wrapperTag="ul"
          slidesPerView={3}
          freeMode
          direction="vertical"
          modules={[FreeMode, Thumbs]}
          className="carrouselThumbs"
        >
          {imgs?.map((img) => (
            <SwiperSlide tag="li" key={img}>
              <img src={img} alt="alt" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Carrousel;
