"use client"
import React, { useEffect, useState } from 'react'
import CartItem from '../components/cartItem'
import { Button } from '@/components/ui/button'
import { fetchData } from '../requests'

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any>([])
  useEffect(() => {
    fetchData("orders/?status=pending").then((data)=>{setCartItems(data)})
  }, [])
  return (
    <div>
      <h1 className='font-bold text-3xl mx-5'>Your Cart :</h1>
      <div>
        {
          cartItems.map((item: any, index: any) =>
            <CartItem prod={item} key={index} />
          )
        }
      </div>
      <div className='flex justify-end items-center'>

        <Button className='m-5 text-lg'>
          Confirm Order
        </Button>
      </div>
    </div>
  )
}

export default CartPage