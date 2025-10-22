import React, { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronRight, LayoutGrid } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Category } from "../interfaces/interfaces"
 
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

  // Determinar si el dispositivo soporta hover (desktop) o no (móvil)
  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
      setIsHoverable(!!mq.matches)
    }
  }, [])

  // Cerrar el menú al hacer clic fuera de él
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

  // 🎯 Las subcategorías ya vienen en el array de categories, no necesitamos llamar al servicio
  const getSubcategories = (category: Category) => {
    return category.subcategories || []
  }

  // Determinar qué categoría está activa (hover en desktop, expandida en móvil)
  const activeCat = (isHoverable ? hoverCat : expandedCat) || null
  const activeCategory = categories.find(c => c.id === activeCat)

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
      {/* Botón para abrir/cerrar el menú */}
      <button
        className="departments-toggle"
        onClick={() => {
          if (!isHoverable) setOpen(!open)
        }}
        aria-label="Menú de categorías"
      >
        <LayoutGrid size={18} className="departments-icon" />
        <span>Categorías</span>
        <ChevronDown size={16} />
      </button>

      {/* Dropdown del menú */}
      {open && (
        <div className="departments-dropdown">
          <div className="departments-columns">
            {/* Lista de categorías principales */}
            <ul className="departments-list">
              {categories.map((c) => {
                const subcats = getSubcategories(c)
                return (
                  <li
                    key={c.id}
                    className={`department-item ${activeCat === c.id ? "active" : ""}`}
                    onMouseEnter={() => isHoverable && setHoverCat(c.id)}
                  >
                    <button
                      className="department-link"
                      onClick={() => {
                        if (!isHoverable) {
                          // En móvil: expandir/colapsar subcategorías
                          setExpandedCat(expandedCat === c.id ? null : c.id)
                        }
                      }}
                      onMouseEnter={() => isHoverable && setHoverCat(c.id)}
                    >
                      <span className="square-color" />
                      <span>{c.name}</span>
                      {subcats.length > 0 && <ChevronRight size={14} />}
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Panel de subcategorías (solo visible en desktop) */}
            <div className="departments-subpanel">
              {activeCategory && (
                <div className="subcategory-panel">
                  <div className="subcategory-title">{activeCategory.name}</div>
                  <ul className="subcategory-listing">
                    {/* Opción para ver todas las subcategorías */}
                    <li>
                      <button 
                        className="subcategory-link view-all" 
                        onMouseDown={() => handleCategoryClick(activeCategory.id)}
                      >
                        Todos
                      </button>
                    </li>
                    {/* Lista de subcategorías */}
                    {getSubcategories(activeCategory).map((s:any) => (
                      <li key={s.id}>
                        <button 
                          className="subcategory-link" 
                          onMouseDown={() => handleSubcategoryClick(s.id)}
                        >
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