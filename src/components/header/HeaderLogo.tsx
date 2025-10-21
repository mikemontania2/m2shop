"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
 
const HeaderLogo: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="logo" onClick={() => navigate("/")} aria-label="Cavallaro - inicio">
      <img src="https://www.cavallaro.com.py/img/logo-web-blanco.png" alt="Cavallaro" />
    </div>
  )
}

export default HeaderLogo
