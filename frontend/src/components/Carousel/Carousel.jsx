import React, { useEffect, useState } from 'react'
import Slide from './Slide/Slide'
import './Carousel.css';
import pic from '../../assets/lunch_banner.jpg';

const Carousel = (props) => {
  const [timeduration] = useState(4000)
  const [play, setPlay] = useState(true)
  const [pos, setPos] = useState(0)
  const slides = [
  
    {
      subtitle: "昼間のランチ相手探すのは大変？",
      title: "マッチしてみたら!",
      img: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bHVuY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      position: 1,
      class: 'left',
    },
    {
      subtitle: "IBJ昼マッチ",
      title: "いろんな文化のランチ楽しめる",
      img: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGx1bmNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      position: 2,
      img2: 'http://assets.stickpng.com/thumbs/5af16e2c6554160a79bea007.png',
      class: 'leftimg',
    },
    {
      title: '社内ネットワークひろ展開',
      subtitle: '知らない同僚と仲良くなろう',
      img: pic,
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