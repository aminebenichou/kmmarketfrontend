import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { ShoppingCart, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


export type product = {
    id: string
    image: string,
    title: string,
    price: number,
    rating?: number,
    description?: string,
    category?: string,
    seller?: string,
    sale?: boolean,
    shippingToOffice?: number,
    shippingToHome?: number,

}


const ProductCard = ({ data }: { data: product }) => {
    return (
        <div className='mx-2'>
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