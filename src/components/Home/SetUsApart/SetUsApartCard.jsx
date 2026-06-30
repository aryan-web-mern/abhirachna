import React from 'react'
import Style from "./setusapartcard.module.css"

function SetUsApartCard({heading, subtext, number, className, ref}) {
  return (
    <div className={`${Style.cardConatiner} ${className}`} ref={ref}>
        <div className={Style.circleNo}>0{number}</div>
        <div className={Style.textContainer}>
            <h4>{heading}</h4>
            <p>{subtext}</p>
        </div>
    </div>
  )
}

export default SetUsApartCard