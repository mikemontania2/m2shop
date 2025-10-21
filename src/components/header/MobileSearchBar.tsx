"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import SearchBar from "./SearchBar"
import CartButton from "./CartButton"

const MobileSearchBar: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<boolean>).detail
      setShowMobileMenu(detail)
    }
    window.addEventListener("nav-toggle", handler as EventListener)
    return () => window.removeEventListener("nav-toggle", handler as EventListener)
  }, [])

  const toggleMobileMenu = () => {
    const next = !showMobileMenu
    setShowMobileMenu(next)
    window.dispatchEvent(new CustomEvent("nav-toggle", { detail: next }))
  }

  return (
    <div className="mobile-search-bar">
      <div className="mobile-search-container">
        <div className="mobile-search-left">
          <SearchBar />
        </div>
        <div className="mobile-search-right">
          <CartButton />
          <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileSearchBar
