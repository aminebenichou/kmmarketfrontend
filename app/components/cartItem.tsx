import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { product as Product } from './productCard'
import { CartItemType } from '../cart/page'

const CartItem = ({ prod }: { prod: CartItemType }) => {
    return (
        <div className='my-2'>
            <Card>
                <CardHeader className='flex justify-start items-center'>
                    <img src={prod.image} className='max-w-24' alt="" />
                    <div>
                        <CardTitle>
                            {prod.name}
                        </CardTitle>
                        <CardDescription>
                            {prod.description}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='flex w-full justify-between items-center'>
                        <h3 className='font-bold'>
                            {prod.price} DZD
                        </h3>
                        <div className='flex justify-around items-center'>
                            <Label>Quantity:</Label>
                            <Input defaultValue={1} className='w-24 my-5 mx-5' type='number' />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CartItem