import React from "react";
import loading from "../assets/loading.png"

export const Splash = () => {

  return (
    <div>
      <img src={loading} />
      <div style={{
        position: 'absolute', left: '50%', top: '90%',
        transform: 'translate(-50%, -50%)',
        color: '#F6780D'
      }}> Please trigger a render</div>
    </div>

  )

}