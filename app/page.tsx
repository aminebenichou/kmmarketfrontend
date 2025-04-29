'use client'
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay"
import ProductCard, { product } from "./components/productCard";
import SearchBar from "./components/search";
import { fetchData } from "./requests";

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const carouselItems = [
    {
      imagePath: "./next.svg",
      url: ""
    },
    {
      imagePath: "./globe.svg",
      url: ""
    },
    {
      imagePath: "./vercel.svg",
      url: ""
    },
  ]

  const [products, setProducts] = useState<any>()

  useEffect(() => {
    fetchData("products/").then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <div className="w-[100%] p-5 flex flex-col justify-center items-center flex-wrap">
      
      <Carousel plugins={[plugin.current]} className="w-[90%] border m-5 h-[70vh]">
        <CarouselContent className="h-[100%]">
          {carouselItems.map((item) =>
            <CarouselItem className="" key={item.imagePath}>
              <img className="max-h-[70vh]" src={item.imagePath} alt="" />
            </CarouselItem>
          )
          }

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex flex-wrap justify-evenly items-center">
        {
          products && products.map((product:any) => <ProductCard key={product.id} data={product} />)
        }

      </div>
    </div>
  );
}
