'use client'
import { Button } from '@/components/ui/button'
import { SearchIcon, ShoppingCart, UserIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../providers/AuthProviderClient'
import SearchBar from './search'
import { ModeToggle } from './theme-toggle'

const Navbar = () => {
    const navItems = [
        { label: "Home", link: "/" },
        { label: "Products", link: "/products" },
        { label: "Contact", link: "/contact" },
    ]
    const { isAuthenticated, token } = useAuth();
    const [toggle, setToggle] = useState(false)
    return (
        <div className='w-full'>
            <div className='w-[100%] px-5 flex justify-between items-center h-16 sticky top-0 z-50'>
                <div>
                    <h3>KM Market</h3>
                </div>

                <div className='flex justify-evenly items-center'>
                    {
                        navItems.map((item) => {
                            return (
                                <Link
                                    href={item.link}
                                    key={item.label}
                                    className="p-2 mx-5 rounded-lg transition-colors duration-200 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring font-bold"
                                >
                                    {item.label}
                                </Link>

                            )
                        })

                    }
                    <Button variant="outline" className="mx-2" onClick={() => setToggle(!toggle)}>
                        <SearchIcon />
                    </Button>
                    <Link className="mx-2" href="/cart">
                        <Button variant="outline">
                            <ShoppingCart />
                        </Button>
                    </Link>
                    <Link className="mx-2 mr-4"  href={isAuthenticated ? "/myaccount" : "/login"}>
                        <Button variant="outline">
                            <UserIcon />
                        </Button>
                    </Link>
                  <ModeToggle  />

                </div>


            </div>
            <div className='w-full'>
                <center>

                    {
                        toggle && <SearchBar />
                    }
                </center>
            </div>
        </div>
    )
}

export default Navbar