import React, { useEffect, useState } from 'react'
import Slide from './Slide/Slide'
import './Carousel.css';
import banner1 from '../../assets/lunch_banner1.jpg';
import banner2 from '../../assets/lunch_banner2.jpg';
import banner3 from '../../assets/lunch_banner3.jpg';
import banner2Extra from '../../assets/lunch_banner2_extra.png';

const Carousel = (props) => {
  const [timeduration] = useState(4000)
  const [play, setPlay] = useState(true)
  const [pos, setPos] = useState(0)
  const slides = [
  
    {
      subtitle: "昼間のランチ相手探すのは大変？",
      title: "マッチしてみたら!",
      img: banner1,
      position: 1,
      class: 'left',
    },
    {
      subtitle: "IBJ昼マッチ",
      title: "いろんな文化のランチ楽しめる",
      img: banner2,
      position: 2,
      img2: banner2Extra,
      class: 'leftimg',
    },
    {
      title: '社内ネットワーク展開',
      subtitle: '知らない同僚と仲良くなろう',
      img: banner3,
      position: 3,
      class: 'center',
    }
  ]
  const slidesrow = slides?.map((slide, i)=>{
    return <Slide className={`slide ${slide.class} ${((pos%slides.length)===i)&&'active'}`} slide={slide} pos={pos} />
  })
  const carouselnavrow = slides.map((slide, i)=>{
    return (
      <div className={`carouselitem ${((pos%slides.length)===i)&&'activecarouselitem'}`} onClick={()=>{setPos(i); setPlay(false);setTimeout(()=>{setPlay(true)}, 0)}}>
        <i className="fal fa-dot-circle"></i>
      </div>
    )
  })

  const  [elap, setElap] = useState(0)
  useEffect(()=> {
    setPos(0)
  },[])
  useEffect(()=>{
    let timer
    let elap
    if(play) {
      timer = setInterval(()=>{
        setPos(prev=> prev+1)
        setElap(0)
      }, timeduration)
      elap = setInterval(()=>{
        setElap(prev=> prev +1)
      }, 1)
    }else {
      clearInterval(timer)
      clearInterval(elap)
      setElap(0)

    }
    return() => {
      clearInterval(timer)
      clearInterval(elap)
      setElap(0)
    }
  },[play, timeduration])

  return (
    <div className="carouselbanner">
      {/* <div className="progress">
        <div className="prog" style={{width: (elap*400)/(timeduration)+'%'}}></div>
      </div> */}
      <div className="slides">
       {slidesrow}
      </div>
      <div className="carouselcontrols">
      {carouselnavrow}
        <div className="pause">
          <i onClick={()=>setPlay(!play)} className={play?'fal fa-pause':'fal fa-play'}></i>
        </div>
      </div>
    </div>
  )
}
export default Carousel