"use client"

import React, { useState } from "react"
import productService, { type Category } from "../services/productService"
import DepartmentsMenu from "./DepartmentsMenu"
import HeaderLogo from "./header/HeaderLogo"
import SearchBar from "./header/SearchBar"
import HeaderUser from "./header/HeaderUser"
import CartButton from "./header/CartButton"
import MobileSearchBar from "./header/MobileSearchBar"

const Header: React.FC = () => {
  const [navCategories, setNavCategories] = useState<Category[]>([])

  // Load categories for nav
  React.useEffect(() => {
    setNavCategories(productService.getCategories())
  }, [])

  return (
    <>
      <header className="header">
        <div className="header-main">
          <div className="container">
            <div className="header-main-content">
              <div className="header-left">
                <HeaderLogo />
                <DepartmentsMenu categories={navCategories} />
              </div>

              <SearchBar />

              <div className="header-actions">
                <HeaderUser />
                <CartButton />
              </div>
            </div>
          </div>
        </div>

        <div className="header-mobile-line2">
          <div className="container">
            <HeaderLogo />
            <HeaderUser />
          </div>
        </div>
      </header>
            
      <MobileSearchBar />
    </>
  )
}

export default Header
