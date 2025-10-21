"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronRight, LayoutGrid } from "lucide-react"
import { useNavigate } from "react-router-dom"
import productService, { type Category, type Subcategory } from "../services/productService"

interface DepartmentsMenuProps {
  categories: Category[]
}

const DepartmentsMenu: React.FC<DepartmentsMenuProps> = ({ categories }) => {
  const [open, setOpen] = useState(false)
  const [expandedCat, setExpandedCat] = useState<string | null>(null)
  const [hoverCat, setHoverCat] = useState<string | null>(null)
  const [isHoverable, setIsHoverable] = useState<boolean>(true)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Determine if the device supports hover (desktop) or not (mobile)
    if (typeof window !== "undefined" && "matchMedia" in window) {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
      setIsHoverable(!!mq.matches)
    }
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleCategoryClick = (catId: string) => {
    navigate(`/${catId}`)
    setOpen(false)
  }

  const handleSubcategoryClick = (subId: string) => {
    navigate(`/catalogo/${subId}`)
    setOpen(false)
  }

  const getSubcategories = (catId: string): Subcategory[] => {
    return productService.getSubcategoriesByCategory(catId)
  }

  const activeCat = (isHoverable ? hoverCat : expandedCat) || null

  return (
    <div
      className="departments-menu"
      ref={menuRef}
      onMouseEnter={() => {
        if (isHoverable) setOpen(true)
      }}
      onMouseLeave={() => {
        if (isHoverable) {
          setOpen(false)
          setHoverCat(null)
        }
      }}
    >
      <button
        className="departments-toggle"
        onClick={() => {
          if (!isHoverable) setOpen(!open)
        }}
      >
        <LayoutGrid size={18} className="departments-icon" />
        <span>Categorías</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="departments-dropdown">
          <div className="departments-columns">
            <ul className="departments-list">
              {categories.map((c) => (
                <li
                  key={c.id}
                  className={`department-item ${activeCat === c.id ? "active" : ""}`}
                  onMouseEnter={() => isHoverable && setHoverCat(c.id)}
                >
                  <button
                    className="department-link"
                    onClick={() => {
                      if (!isHoverable) setExpandedCat(expandedCat === c.id ? null : c.id)
                    }}
                    onMouseEnter={() => isHoverable && setHoverCat(c.id)}
                  >
                    <span className="square-color" />
                    <span>{c.name}</span>
                    {getSubcategories(c.id).length > 0 && <ChevronRight size={14} />}
                  </button>
                </li>
              ))}
            </ul>
            <div className="departments-subpanel">
              {activeCat && (
                <div className="subcategory-panel">
                  <div className="subcategory-title">{categories.find((cc) => cc.id === activeCat)?.name}</div>
                  <ul className="subcategory-listing">
                    <li>
                      <button className="subcategory-link view-all" onMouseDown={() => handleCategoryClick(activeCat)}>
                        Todos
                      </button>
                    </li>
                    {getSubcategories(activeCat).map((s) => (
                      <li key={s.id}>
                        <button className="subcategory-link" onMouseDown={() => handleSubcategoryClick(s.id)}>
                          {s.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepartmentsMenu
