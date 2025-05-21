"use client";
import React, { useEffect, useState } from "react";
import CartItem from "../components/cartItem";
import { Button } from "@/components/ui/button";
import { fetchData } from "../requests";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "../providers/AuthProviderClient";
import { product as Product } from "../components/productCard";
export type CartItemType = {
  id: number;
  product: Product;
  quantity: number;
  image?: string
  name?: string
  description?: string
  price?: string
  // Add other fields depending on your API response
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemType[] | null>([]);
  const { token } = useAuth()
  useEffect(() => {
    fetchData("orders/?status=pending", {
      headers:{
        'Authorization':`Token ${token}`
      }
    }).then((data: unknown) => {
      setCartItems(data as CartItemType[]);
    });
  }, []);

  const isCartEmpty = cartItems?.length === 0;

  return (
    <div>
      <h1 className="font-bold text-3xl mx-5">Your Cart :</h1>

      <div className="p-4">
        {cartItems === null ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : isCartEmpty ? (
          <Card className="flex justify-center items-center mt-10">
            <CardHeader className="flex flex-col w-full justify-center items-center">
              <CardTitle className="my-5">YOUR CART IS EMPTY</CardTitle>
              <CardDescription>
                <Link href="/products">
                  <Button>Shop Here</Button>
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          cartItems.map((item, index) => (
            <CartItem prod={item} key={index} />
          ))
        )}
      </div>

      {cartItems && cartItems.length > 0 && (
        <div className="flex justify-end items-center">
          <Button className="m-5 text-lg">Confirm Order</Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
