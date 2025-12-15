import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
export default function HighpaidMatches() {
  const [images, setImages] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/GetAllImage")
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handelimage=()=>
  {
    navigate("/getallpromp");
  }
  return (
    <div className="w-full px-2 py-6">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        navigation={true}
        autoplay={{ delay: 2000 }}
        loop={true}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img
              src={`data:${image.type};base64,${image.contain}`}
              alt={image.name}
              className="rounded-xl max-w-[600px] max-h-[400px] object-cover shadow-lg"
              onClick={handelimage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
