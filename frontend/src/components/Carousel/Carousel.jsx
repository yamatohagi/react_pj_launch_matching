import React, { useEffect, useState } from 'react'
import Slide from './Slide/Slide';
import banner1 from '../../assets/lunch_banner1.jpg';
import banner2 from '../../assets/lunch_banner2.jpg';
import banner3 from '../../assets/lunch_banner3.jpg';
import banner2Extra from '../../assets/logo.png';

const Carousel = (props) => {
  const [timeduration] = useState(4000)
  const [pos, setPos] = useState(0)
  const slides = [
    {
      subtitle: "IBJ昼マッチ",
      title: "いろんな文化のランチ楽しめる",
      textClass: 'white-text',
      img: banner1,
      position: 2,
      img2: banner2Extra,
      class: 'leftimg',
    },
    {
      subtitle: "昼間のランチ相手探すのは大変？",
      title: "マッチしてみたら!",
      img: banner2,
      position: 1,
      class: 'left',
    },
    {
      title: '社内ネットワーク展開',
      subtitle: '知らない同僚と仲良くなろう',
      textClass: 'white-text',
      img: banner3,
      position: 3,
      class: 'center',
    }
  ]
  const slidesrow = slides?.map((slide, i)=>{
    return <Slide className={`slide ${slide.class} ${((pos%slides.length)===i)&&'active'}`} slide={slide} pos={pos} />
  })

  useEffect(()=> {
    setPos(0)
  },[])
  useEffect(()=>{
    let timer
      timer = setInterval(()=>{
        setPos(prev=> prev+1)
      }, timeduration)
    return() => {
      clearInterval(timer)
    }
  },[timeduration])

  return (
    <div className="carouselbanner">
      <div className="slides">
       {slidesrow}
      </div>
    </div>
  )
}
export default Carousel