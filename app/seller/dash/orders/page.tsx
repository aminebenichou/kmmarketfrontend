'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { fetchData, patchRequest } from '@/app/requests'
import { useAuth } from '@/app/providers/AuthProviderClient'

type Product = {
  id: number
  name: string
  price: number
}

type Order = {
  id: number
  order_number: string
  client: {
    user:{
      username: string
    }
  }
  date: string
  status: 'pending' | 'confirmed' | 'canceled'
  products: Product[]
}

const SellerOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])

  const {isAuthenticated, token} = useAuth()

  useEffect(() => {
    // Replace with real API call
    const fetchOrders = async () => {
      const data : unknown = await fetchData('orders/by-seller/', {
        headers:{
            'Authorization': `Token ${token}`
        }
      }) // this should be your Django endpoint
    //   const data = await res.json()
      setOrders(data as Order[])
    }

    fetchOrders()
  }, [])

  const updateOrderStatus = async (id: number, newStatus: string) => {
    const updatedOrder = await patchRequest(
        `orders/update-by-seller/?id=${id}`,
        {
            status: newStatus,
        }
      )
      

    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: newStatus as Order['status'] } : order
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Manage Orders</h1>

        {orders.map(order => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>#{order.order_number}</CardTitle>
              <Badge variant={
                order.status === 'confirmed'
                  ? 'default'
                  : order.status === 'canceled'
                  ? 'destructive'
                  : 'secondary'
              }>
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Client:</strong> {order.client.user.username}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Products:</strong></p>
              <ul className="list-disc list-inside ml-2">
                {order.products.map((product) => (
                  <li key={product.id}>{product.name} (${product.price})</li>
                ))}
              </ul>

              {order.status === 'pending' && (
                <div className="flex gap-4 pt-2">
                  <Button onClick={() => updateOrderStatus(order.id, 'confirmed')}>
                    Confirm
                  </Button>
                  <Button variant="destructive" onClick={() => updateOrderStatus(order.id, 'canceled')}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500">No orders available.</p>
        )}
      </div>
    </div>
  )
}

export default SellerOrdersPage
