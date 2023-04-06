import React from 'react'
import { SwiperSlide } from 'swiper/react'
import MediaItem from './MediaItem'
import AutoSwiper from './AutoSwiper'


const RecommendSlide = ({medias,mediaType}) => {
  return (
    <AutoSwiper>
        {medias.map((media,index)=>(
            <SwiperSlide key={index}>
                <MediaItem media={media} mediaType={media}/>
            </SwiperSlide>
        ))}
    </AutoSwiper>
  )
}

export default RecommendSlide