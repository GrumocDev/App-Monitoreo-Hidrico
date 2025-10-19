"use client"
import React from 'react'
import Slider from "react-slick";
import { GiHand } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";
import Cards from '../Cards';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SlideCards() {

  const InfoCards = [
    {
      title: "Plan Departamental de Desarrollo Bolívar Primero 2020 - 2023",
      description: '"Es necesario la implementación de un sistema de monitoreo ambiental en el departamento de Bolívar con el fin de disponer de información  válida sobre la contaminación de las fuentes hídricas del departamento."',
      stars: 5,
      linea_base: 0,
      meta_cuatrenio: 1,
      icon: <GiHand />
    },
    {
      title: "Plan Distrital de Desarrollo Salvemos a Cartagena 2020 - 2023",
      description: '"Sin un sistema de monitoreo permanente de la calidad de los recursos no es posible tomar medidas preventivas o alertas ni dictar medidas de mitigación temporales o permanentes que salvaguarden la salud de las especies presentes en los ecosistemas y de las personas."',
      stars: 5,
      linea_base: 0,
      meta_cuatrenio: 4,
      icon: <FaLeaf />
    },
    {
      title: "Plan Departamental de Desarrollo Bolívar Primero 2020 - 2023",
      description: '"Es necesario la implementación de un sistema de monitoreo ambiental en el departamento de Bolívar con el fin de disponer de información  válida sobre la contaminación de las fuentes hídricas del departamento."',
      stars: 5,
      linea_base: 0,
      meta_cuatrenio: 1,
      icon: <GiHand />
    },
    {
      title: "Plan Distrital de Desarrollo Salvemos a Cartagena 2020 - 2023",
      description: '"Sin un sistema de monitoreo permanente de la calidad de los recursos no es posible tomar medidas preventivas o alertas ni dictar medidas de mitigación temporales o permanentes que salvaguarden la salud de las especies presentes en los ecosistemas y de las personas."',
      stars: 5,
      linea_base: 0,
      meta_cuatrenio: 4,
      icon: <FaLeaf />
    },
  ]
  

  const settings = {
    className: "center",
    cssEase: "linear",
    nextArrow: <span/>,
    prevArrow: <span/>,
    arrows:false,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    centerPadding: "60px",
    appendDots: (dots:number) => (
      <div
        style={{
          display:"flex",
        }}
      >
        <ul style={{ marginTop: "40px"}}> {dots} </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className='w-full'>
      <Slider {...settings}>
        {InfoCards.map((card, i)=><Cards info={card} key={i}/>)}
      </Slider>
    </section>
  )
}
