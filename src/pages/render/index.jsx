// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect } from "react"
// Import Swiper styles
import 'swiper/css';
import axios from 'axios';

export const m3utojson = (m3u) => {
  return m3u
    .replace('#EXTM3U', '')
    .split('#EXTINF:0,')
    .slice(1)
    .map(function (str, index) {
      var channel = str.split('\n').slice(0, -1);

      return {
        "id": index + 1,
        "number": index + 1,
        "title": channel[0],
        "tv_logo": "",
        "tv_categories": [2],
        "streaming_url": channel[1],
        "announce": "",
        "volume_shift": 0
      };
    });
}

export default () => {

  const m3uUrl = 'https://streamfostv.com:8443/get.php?username=smarters&password=smarters1234';



  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
};