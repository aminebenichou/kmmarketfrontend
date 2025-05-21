'use client';

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import ProductCard, {product as Product} from "./components/productCard";
import SearchBar from "./components/search";
import { fetchData } from "./requests";
import Link from "next/link";

// Define product type according to your API response shape
// export interface Product {
//   id: string | number;
//   name: string;
//   price: number;
//   imageUrl: string;
//   // add more fields as needed
// }

export default function Home() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const carouselItems = [
    {
      imagePath: "/1.svg",
      url: ""
    },
    {
      imagePath: "/2.svg",
      url: ""
    },
    {
      imagePath: "/3.svg",
      url: "/seller"
    },
    {
      imagePath: "/4.svg",
      url: ""
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData<Product[]>("products/").then((data) => {
      setProducts(data ?? []);
    }).catch((error) => {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    });
  }, []);

  return (
    <div className="w-[100%] p-5 flex flex-col justify-center items-center flex-wrap">
      <Carousel plugins={[plugin.current]} className="w-[90%] border m-5 h-fit">
        <CarouselContent className="h-fit">
          {carouselItems.map((item) => (
            <CarouselItem key={item.imagePath}>
              <Link href={item.url}>
                <img
                  className="max-h-[70vh]"
                  src={item.imagePath}
                  alt=""
                  // You can replace <img> with <Image> for optimization, if needed
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex flex-wrap justify-evenly items-center">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}
