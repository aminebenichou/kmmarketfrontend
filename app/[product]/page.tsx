'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Box, CircleArrowOutUpLeftIcon, Home, MessageCircleIcon, Phone, ShoppingCart, Star, StarHalf, Truck, TvIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ProductCard, { product } from '../components/productCard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchData } from '../requests'
import { useParams } from 'next/navigation'



const IconWithText = ({Icon, text}:{Icon:any, text:string})=>{
    return(
        <div className="flex items-center space-x-2">
            {
                <Icon />
            }
            <span className='text-md font-bold'>{text}</span>
        </div>
    )
}

const ProductPage = () => {
    const params = useParams()
    const productId = params.product
    
    
    const imgUrl = "public/next.svg"
    var i = 0
    const wilayas = [
        { id: 1, name: "wilaya1" },
        { id: 2, name: "wilaya2" },
        { id: 3, name: "wilaya3" },
    ]
    const communes = [
        { id: 1, name: "commune1" },
        { id: 2, name: "commune2" },
        { id: 3, name: "commune3" },
    ]
    const suggestedProducts = [
        {
            id: "1",
            image: "./1.jpg",
            title: "test Product",
            price: 15000,
            rating: 5.5,
            description: "string",
            category: "string",
            seller: "string",
            sale: false,
        },
        {
            id: "2",
            image: "./1.jpg",
            title: "test Product",
            price: 15000,
            rating: 5.5,
            description: "string",
            category: "string",
            seller: "string",
            sale: false,
        },
        {
            id: "3",
            image: "./1.jpg",
            title: "test Product",
            price: 15000,
            rating: 5.5,
            description: "string",
            category: "string",
            seller: "string",
            sale: false,
        },
        {
            id: "4",
            image: "./1.jpg",
            title: "test Product",
            price: 15000,
            rating: 5.5,
            description: "string",
            category: "string",
            seller: "string",
            sale: false,
        },

    ]
    const [product, setProduct] = useState<any>()
    useEffect(()=>{
        fetchData(`http://127.0.0.1:8000/products/${productId}`).then((data:any)=>{
            setProduct(data)
        })
    }, [])
    const displayRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} size={24} fill="#FFD700" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half" size={24} fill="#FFD700" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} size={24} fill="none" />);
        }

        return stars;
    };
    return (
        <div className='h-full flex w-full py-10'>
            <div className='w-3/4'>
                {/* Product info */}
                <div className='flex justify-evenly items-start m-10 w-2/3'>
                    <div>
                        <img className='w-250' src={product?.image} alt="" />
                        <div></div>
                    </div>
                    <div className='flex flex-col justify-start items-start mx-25 w-full'>
                        <h1 className='text-2xl font-bold'>{product?.title}</h1>
                        <p className='text-lg text-muted-foreground'>{product?.seller?.username}</p>
                        <div className='flex flex-col'>
                            <p className='font-bold text-lg'>{product?.price} DZD</p>

                            <p className='text-white text-md font-bold border rounded-full bg-red-700 p-2 my-5'>
                                20 Items Left
                            </p>
                        </div>
                        <div className='flex'>
                            {
                                displayRating(product?.rating || 0)
                            }
                        </div>
                        <Button className='my-10 cursor-pointer'>
                            <ShoppingCart /> Add To Cart
                        </Button>
                        <div className='my-5 flex'>
                            <Button className='mr-5 cursor-pointer'>
                                <Phone /> Call
                            </Button>
                            <Button className='cursor-pointer'>
                                <MessageCircleIcon /> Message
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start mx-10'>
                    <Accordion className='w-[1000px]' type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Description</AccordionTrigger>
                            <AccordionContent>
                                {product?.description}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Ratings</AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Info About Seller</AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='w-full mx-5'>
                    <Card className='shadow-none border-none'>
                        <CardHeader>
                            <CardTitle>You Might Also Like</CardTitle>
                        </CardHeader>
                        <CardContent className='flex justify-evenly items-center'>
                            {suggestedProducts.map((product, index) =>
                                <ProductCard data={product} key={index} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className='w-1/3'>
                {/* shipping info */}
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>
                            Shipping
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Select a Wilaya" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        wilayas.map((wilaya, index) => (
                                            <SelectItem key={index} value={wilaya.name}> {wilaya.name} </SelectItem>
                                        ))
                                    }

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <br />
                        <Select>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Select a Commune" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        communes.map((commune, index) => (
                                            <SelectItem key={index} value={commune.name}> {commune.name} </SelectItem>
                                        ))
                                    }


                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <div className='my-5'>
                                    <IconWithText Icon={Truck} text={'Shipping Fee To home is : \n  ' + product?.shippingToHome?.toString()  + 'DZD'}  />
                                    <br />
                                    <IconWithText Icon={Box} text={'Shipping Fee To Office is : \n  ' + product?.shippingToOffice?.toString()  + 'DZD'}  />
                                    <br />
                                    <IconWithText Icon={CircleArrowOutUpLeftIcon} text={'Return is Free before 7 days'}  />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}



export default ProductPage