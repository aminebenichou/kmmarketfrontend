'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SellerDashboardPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-3xl font-bold">Welcome, Seller 👋</h1>
                    <p className="text-gray-600">Here’s an overview of your store performance.</p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">2,450 DZD</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">128</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">34</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">5</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Link href={"/seller/dash/addProduct"}>

                        <Button>Add New Product</Button>
                    </Link>
                    <Link href={"/seller/dash/orders"}>
                    <Button variant="outline">View Orders</Button>
                    </Link>
                    <Link href={"/seller/dash/products"}>
                    <Button variant="outline">View Products</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SellerDashboardPage
