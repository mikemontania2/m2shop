"use client"

import React, { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { searchProductos } from "../../services/productos.service"
import type { Product } from "../../interfaces/Productos.interface"

interface SearchBarProps {
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const searchRef = useRef<HTMLFormElement | null>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const navigate = useNavigate()

  // Buscar al enviar el formulario
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`)
    setShowSuggestions(false)
    setSearchQuery("")
    setIsMobileSearchOpen(false)
  }

  // Lógica de debounce para sugerencias
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    if (searchQuery.trim().length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      setLoadingSuggestions(false)
      return
    }

    setLoadingSuggestions(true)

    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await searchProductos(searchQuery.trim(), 1, 6)

        if (response.success && response.productos) {
          setSuggestions(response.productos)
          setShowSuggestions(response.productos.length > 0)
        } else {
          setSuggestions([])
          setShowSuggestions(true)
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setLoadingSuggestions(false)
      }
    }, 300)

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [searchQuery])

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Navegación con teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault()
      const product = suggestions[highlightedIndex]
      navigate(`/producto/${product.slug}`)
      setShowSuggestions(false)
      setSearchQuery("")
      setIsMobileSearchOpen(false)
    }
  }

  // Enfocar para abrir overlay en mobile
  const handleFocus = () => {
    if (window.innerWidth <= 768) setIsMobileSearchOpen(true)
    if (suggestions.length > 0) setShowSuggestions(true)
  }

  const handleCloseMobile = () => {
    setIsMobileSearchOpen(false)
    setShowSuggestions(false)
  }

  const handleSelect = (slug: string) => {
    navigate(`/producto/${slug}`)
    setShowSuggestions(false)
    setSearchQuery("")
    setIsMobileSearchOpen(false)
  }

  const renderSuggestions = () => (
    <div className="search-suggestions">
      {loadingSuggestions ? (
        <div className="suggestions-loading">
          <p>Buscando productos...</p>
        </div>
      ) : suggestions.length > 0 ? (
        <ul>
          {suggestions.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                className={`suggestion-item ${i === highlightedIndex ? "highlighted" : ""}`}
                onClick={() => handleSelect(p.slug)}
              >
                <img src={p.image || "/placeholder.svg"} alt={p.name} />
                <div className="suggestion-info">
                  <span className="suggestion-name">{p.name}</span>
                  <span className="suggestion-price">
                    {p.originalPrice > 0 && p.originalPrice > p.price && (
                      <span className="original-price">Gs. {p.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="current-price">Gs. {p.price.toLocaleString()}</span>
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="suggestions-empty">
          <p>No se encontraron productos para “{searchQuery}”.</p>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* 💻 Escritorio */}
      <form
        className={`search-form ${className || ""}`}
        onSubmit={handleSearch}
        ref={searchRef}
      >
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">
          {loadingSuggestions ? <span className="loader"></span> : <Search size={20} />}
        </button>
        {showSuggestions && renderSuggestions()}
      </form>

      {/* 📱 Overlay Mobile */}
      {isMobileSearchOpen && (
        <div className="mobile-overlay">
          <div className="mobile-search-header">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              autoFocus
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleCloseMobile}>Cancelar</button>
          </div>
          {showSuggestions && renderSuggestions()}
        </div>
      )}
    </>
  )
}

export default SearchBar
