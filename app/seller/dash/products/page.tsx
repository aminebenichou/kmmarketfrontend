'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/app/providers/AuthProviderClient'
import ProductCard, { product as Product} from '@/app/components/productCard'
import { Loader2 } from 'lucide-react'



const SellerProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const res = await axios.get('http://127.0.0.1:8000/products/products-for-seller/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        })

        setProducts(res.data as Product[])
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      {loading ? (
        <center>
            <Loader2 className='animate-spin' />
        </center>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ProductCard data={product} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SellerProductsPage
