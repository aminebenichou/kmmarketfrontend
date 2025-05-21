'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { fetchData } from '../requests'
import { useAuth } from '../providers/AuthProviderClient'

export type Order = {
    products: [],
    order_number: string,
    client: number,
    date?: string,
    status: string | 'pending',
}

const OrdersCard = () => {

    const {token} = useAuth()

    const [orders, setOrders] = useState<Order[]>()
    useEffect(()=>{
        fetchData("orders/", {
            headers:{
                'Authorization': `Token ${token}`
            }
        }).then((data)=>{
            setOrders(data as Order[])
        })
    },[])

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex py-5 px-5 font-bold text-white w-full bg-gray-400 justify-evenly items-center'>
                        <p className='w-1/4'>Order Number</p>
                        <p className='w-1/4'>Status</p>
                        <p className='w-1/4'>Track</p>
                        <p className='w-1/4'>Cancel Order</p>
                    </div>
                    {
                        orders?.map((order: Order, index: number) =>
                            <div key={index} className='flex py-10 px-5 w-full hover:bg-gray-200 cursor-pointer justify-start items-center'>
                                <p className='w-1/4'>
                                    {order.order_number}
                                </p>
                                <p className='w-1/4'>{
                                    order.status
                                }</p>
                                <div className='w-1/4'>
                                    <Link href={`tracking/${order.order_number}`}>
                                        <Button variant='outline'>Track Order</Button>
                                    </Link>
                                </div>
                                <div className='w-1/4'>
                                    <Button variant='destructive'>Cancel</Button>
                                </div>
                            </div>)
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default OrdersCard