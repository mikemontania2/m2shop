import React, { useEffect, useMemo, useState } from "react"
 
import { useApp } from "../contexts/AppContext"
import { Product, ProductResponse } from "../interfaces/Productos.interface"
import { getDestacados } from "../services/productos.service"

const emptyProduct = (nextId: number): Product => ({
  id: nextId,
  name: "",
  slug: "",
  image: "",
  price: 0,
  originalPrice: 0,
  stock: 0,
  featured: false,
  news: false,
})

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { categories } = useApp()
  const [editing, setEditing] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  const nextId = useMemo(
    () => (products.reduce((m, p) => Math.max(m, p.id), 0) + 1),
    [products]
  )

  // 🔹 Cargar productos al inicio
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res: ProductResponse = await getDestacados(1, 50)
        if (res.success && res.productos) {
          setProducts(res.productos)
        }
      } catch (err) {
        console.error("Error al cargar productos:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const startNew = () => setEditing(emptyProduct(nextId))
  const startEdit = (p: Product) => setEditing({ ...p })
  const cancel = () => setEditing(null)

  const save = () => {
    if (!editing) return

    // Simulación de guardado local (no hay endpoint POST aún)
    const exists = products.find((p) => p.id === editing.id)
    let updated: Product[]
    if (exists) {
      updated = products.map((p) => (p.id === editing.id ? editing : p))
    } else {
      updated = [...products, editing]
    }
    setProducts(updated)
    setEditing(null)
    alert("Producto guardado localmente (simulado).")
  }

  const remove = (id: number) => {
    if (!confirm("¿Eliminar producto?")) return
    setProducts(products.filter((p) => p.id !== id))
    alert("Eliminado localmente (simulado).")
  }

  return (
    <div className="products-admin">
      <h2>Productos</h2>
      <div style={{ marginBottom: 16 }}>
        <button className="btn-primary" onClick={startNew}>
          Nuevo Producto
        </button>
      </div>

      {loading && <p>Cargando productos...</p>}

      {editing && (
        <div className="admin-panel" style={{ marginBottom: 24 }}>
          <div className="form-grid">
            <label>
              Nombre
              <input
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />
            </label>
            <label>
              Slug
              <input
                value={editing.slug}
                onChange={(e) =>
                  setEditing({ ...editing, slug: e.target.value })
                }
              />
            </label>
            <label>
              Precio
              <input
                type="number"
                value={editing.price}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </label>
            <label>
              Precio Original
              <input
                type="number"
                value={editing.originalPrice}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    originalPrice: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </label>
            <label>
              Stock
              <input
                type="number"
                value={editing.stock}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    stock: parseInt(e.target.value) || 0,
                  })
                }
              />
            </label>
            <label>
              Imagen
              <input
                value={editing.image}
                onChange={(e) =>
                  setEditing({ ...editing, image: e.target.value })
                }
              />
            </label>
            <label>
              Destacado
              <select
                value={editing.featured ? "1" : "0"}
                onChange={(e) =>
                  setEditing({ ...editing, featured: e.target.value === "1" })
                }
              >
                <option value="0">No</option>
                <option value="1">Sí</option>
              </select>
            </label>
            <label>
              Nuevo
              <select
                value={editing.news ? "1" : "0"}
                onChange={(e) =>
                  setEditing({ ...editing, news: e.target.value === "1" })
                }
              >
                <option value="0">No</option>
                <option value="1">Sí</option>
              </select>
            </label>
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className="btn-primary" onClick={save}>
              Guardar
            </button>
            <button className="btn-secondary" onClick={cancel}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Slug</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Destacado</th>
              <th>Nuevo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.slug}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.featured ? "Sí" : "No"}</td>
                <td>{p.news ? "Sí" : "No"}</td>
                <td>
                  <button
                    className="btn-secondary"
                    onClick={() => startEdit(p)}
                  >
                    Editar
                  </button>{" "}
                  <button
                    className="btn-secondary"
                    onClick={() => remove(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && products.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 12 }}>
            No hay productos para mostrar.
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductsAdmin
