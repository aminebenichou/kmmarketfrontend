"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard'
import SearchBar from '../components/search'
import { fetchData } from '../requests'

const ProductsPage = () => {
    const [products, setProducts] = useState<any>([])
    useEffect(() => {
        fetchData("http://127.0.0.1:8000/products/").then((data)=>{
            setProducts(data)
        })
    }, [])

    console.log(products)
    return (
        <div className='flex flex-col items-center justify-center'>
            
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