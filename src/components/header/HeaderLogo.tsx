"use client"
import type React from "react"
import { useNavigate } from "react-router-dom"

const HeaderLogo: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="site-branding">
      <a 
        href="/" 
        className="custom-logo-link" 
        rel="home"
        onClick={(e) => {
          e.preventDefault()
          navigate("/")
        }}
        aria-label="Cavallaro - brinda la mejor calidad en productos de limpieza e higiene para el cuidado de tu familia y hogar. Cavallaro te hace brillar"
      >
        <img 
          className="imgheader" 
          src="/src/imagenes/logo-web-blanco.png" 
          alt="Cavallaro, brinda la mejor calidad en productos de limpieza e higiene para el cuidado de tu familia y hogar. Cavallaro te hace brillar"
        />
      </a>
    </div>
  )
}

export default HeaderLogo