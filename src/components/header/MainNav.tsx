"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { Category } from "../../services/productService"
import productService from "../../services/productService"
import MobileSidebar from "./MobileSidebar"

interface MainNavProps {
  categories?: Category[]
  mobileActive?: boolean
  onCloseMobile?: () => void
}

const MainNav: React.FC<MainNavProps> = ({ categories, mobileActive, onCloseMobile }) => {
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [offsetTop, setOffsetTop] = useState<number>(0)
  const lastScroll = useRef<number>(0)
  const [mobileActiveInternal, setMobileActiveInternal] = useState(false)
  const [cats, setCats] = useState<Category[]>(categories ?? [])

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector(".header") as HTMLElement | null
      setOffsetTop(header?.offsetHeight || 0)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY || document.documentElement.scrollTop
      const goingDown = current > lastScroll.current
      setScrolled(current > 0)
      const anyMobileActive = mobileActive || mobileActiveInternal
      setHidden(!anyMobileActive && goingDown && current > offsetTop + 20)
      lastScroll.current = current
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [mobileActive, mobileActiveInternal, offsetTop])

  useEffect(() => {
    if (!categories || categories.length === 0) {
      setCats(productService.getCategories())
    } else {
      setCats(categories)
    }
  }, [categories])

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<boolean>).detail
      setMobileActiveInternal(detail)
    }
    window.addEventListener("nav-toggle", handler as EventListener)
    return () => window.removeEventListener("nav-toggle", handler as EventListener)
  }, [])

  const isMobileActive = mobileActive || mobileActiveInternal

  const isDesktop = typeof window === "undefined" ? true : window.innerWidth > 968

  const handleClose = () => {
    setMobileActiveInternal(false)
    window.dispatchEvent(new CustomEvent("nav-toggle", { detail: false }))
    onCloseMobile?.()
  }

  if (!isDesktop) {
    return <MobileSidebar isOpen={isMobileActive} onClose={handleClose} categories={cats} />
  }

  return (
    <nav className={`main-nav ${hidden ? "nav-hidden" : ""} ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <ul className="nav-list nav-scrollable">
          {cats.map((c) => (
            <li key={c.id} className="nav-item">
              <Link to={`/${c.id}`} className="nav-link" onClick={() => onCloseMobile?.()}>
                {c.name}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <Link to="/la-empresa" className="nav-link" onClick={() => onCloseMobile?.()}>
              LA EMPRESA
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default MainNav
