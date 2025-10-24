"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
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
  const searchRef = useRef<HTMLFormElement | null>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`)
    setShowSuggestions(false)
    setSearchQuery("")
  }

  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    if (searchQuery.trim().length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      setLoadingSuggestions(false)
      return
    }

    // Set loading state immediately
    setLoadingSuggestions(true)

    // Debounce API call by 500ms
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await searchProductos(searchQuery.trim(), 1, 6)

        if (response.success && response.productos) {
          setSuggestions(response.productos)
          setShowSuggestions(response.productos.length > 0)
        } else {
          setSuggestions([])
          setShowSuggestions(false)
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setLoadingSuggestions(false)
      }
    }, 500)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <form className={`search-form ${className || ""}`} onSubmit={handleSearch} ref={searchRef}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true)
        }}
      />
      <button type="submit">
        <Search size={20} />
      </button>
      {showSuggestions && (
        <div className="search-suggestions">
          {loadingSuggestions ? (
            <div className="suggestions-loading">
              <p>Buscando productos...</p>
            </div>
          ) : (
            <ul>
              {suggestions.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className="suggestion-item"
                    onClick={() => {
                      navigate(`/producto/${p.slug}`)
                      setShowSuggestions(false)
                      setSearchQuery("")
                    }}
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
          )}
        </div>
      )}
    </form>
  )
}

export default SearchBar
