"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import productService, { type Product } from "../../services/productService"
import { useNavigate } from "react-router-dom"
 
interface SearchBarProps {
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLFormElement | null>(null)
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set("q", searchQuery.trim())
    navigate(`/catalogo${params.toString() ? `?${params.toString()}` : ""}`)
    setShowSuggestions(false)
  }

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    const all = productService.searchProducts(searchQuery.trim())
    setSuggestions(all.slice(0, 6))
    setShowSuggestions(true)
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
      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions">
          <ul>
            {suggestions.map((p) => (
              <li key={p.id}>
                <button
                  className="suggestion-item"
                  onClick={() => {
                    navigate(`/producto/${p.id}`)
                    setShowSuggestions(false)
                    setSearchQuery("")
                  }}
                >
                  <img src={p.image || "/placeholder.svg"} alt={p.name} />
                  <div className="suggestion-info">
                    <span className="suggestion-name">{p.name}</span>
                    <span className="suggestion-sub">{p.subcategory || p.category}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  )
}

export default SearchBar
