import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { ShoppingCart, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Category } from '../seller/dash/addProduct/page'

export type Seller = {
    username: string;
    // add more fields if needed
}

export type product = {
    id: string
    image?: string,
    title?: string,
    name?: string,
    price?: number,
    rating?: number,
    description?: string,
    category?: string,
    seller?:Seller,
    sale?: boolean,
    shippingToOffice?: number,
    shippingToHome?: number,
    category_data?: Category,

}


const ProductCard = ({ data }: { data: product }) => {
    return (
        <div className='mx-2 my-4'>
            <Link href={data?.id.toString() || ""}>
                <Card className='hover:shadow-xl'>
                    <CardContent className='w-64 h-72 py-5 flex flex-col justify-start items-center'>
                        <img className='max-w-2/3 mb-5' src={data.image} alt="" />
                        <CardTitle className='my-2'>
                            {data.title}
                        </CardTitle>
                        <CardDescription className='my-2'>
                            {data.price}
                        </CardDescription>
                        <CardFooter className='w-full flex'>
                            <Button className='w-full'>Buy Now</Button>
                            <Button variant="ghost">
                                <ShoppingCartIcon />
                            </Button>
                        </CardFooter>
                    </CardContent>


                </Card>
            </Link>
        </div>
    )
}

export default ProductCard