"use client";
import React, { useEffect, useState } from "react";
import ProductCard, { product as Product } from "../components/productCard";
import { fetchData } from "../requests";
import { Badge } from "@/components/ui/badge";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Category } from "../seller/dash/addProduct/page";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [cats, setCats] = useState<Category[]>([]);

    const searchParams = useSearchParams();
    const router = useRouter();
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    useEffect(() => {
        fetchData("products/").then((data: unknown) => setProducts(data as Product[] ));
        fetchData("catgeories/").then((data: unknown) => setCats(data as Category[]));
    }, []);

    useEffect(() => {
        var result = [...products];

        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter((p) =>
                p.title?.toLowerCase().includes(lowerSearch)
            );
        }

        if (category) {
            result = result.filter(
                (p) => p.category_data?.name?.toLowerCase() === category.toLowerCase()
            );
        }

        setFilteredProducts(result);
    }, [search, category, products]);

    const filterByCategory = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("category", category);
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-evenly flex-wrap items-center mt-4">
                {cats.map((cat: Category, index: number) => (
                    <Button
                        key={index}
                        onClick={() => filterByCategory(cat.name)}
                        variant="ghost"
                        className="m-2"
                    >
                        <Badge
                            className={`text-lg rounded-full hover:shadow-md cursor-pointer p-2 ${cat.name.toLowerCase() === category?.toLowerCase()
                                    ? "bg-primary text-white"
                                    : ""
                                }`}
                            variant="outline"
                        >
                            {cat.name}
                        </Badge>
                    </Button>
                ))}
            </div>

            <div className="flex justify-evenly items-center flex-wrap my-5">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <ProductCard data={product} key={index} />
                    ))
                ) : (
                    <center>
                        <Loader2 className="animate-spin" />
                        <p className="text-gray-500 text-xl mt-10">No products found.</p>
                    </center>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
