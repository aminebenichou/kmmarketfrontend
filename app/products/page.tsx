"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard'
import SearchBar from '../components/search'
import { fetchData } from '../requests'
import { Badge } from '@/components/ui/badge'

const ProductsPage = () => {
    const [products, setProducts] = useState<any>([])
    const [cats, setCats] = useState<any>([])
    useEffect(() => {
        fetchData("products/").then((data)=>{
            setProducts(data)
        })
        fetchData("catgeories/").then((data)=>{
            setCats(data)
        })
    }, [])

    console.log(products)
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex justify-evenly flex-wrap items-center'>
                {cats.map((cat:any, index:any)=><Badge className='text-lg mx-2 rounded-full hover:shadow-md cursor-pointer p-2' key={index} variant="outline">{cat.name}</Badge>)}
            </div>
            
            <div className='flex justify-evenly items-center flex-wrap my-5'>
                {
                    products.map((product: any, index: any) =>
                        <ProductCard data={product} key={index} />
                    )
                }
            </div>
        </div>
    )
}

export default ProductsPage