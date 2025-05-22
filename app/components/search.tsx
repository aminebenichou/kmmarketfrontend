"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const SearchBar = () => {

    const [query, setQuery] = useState("")
    const path = usePathname()
    const searchParams = useSearchParams()
    function search() {
        if (path==="/products") {
            const search = searchParams.get('search')
            if (search) {
                setQuery(search);
            }
            redirect(`/products?search=${query}`)
        }
        else{
            redirect(`/products?search=${query}`)
        }
    }

    return (
        <div className="flex justify-center items-center w-full max-w-sm space-x-2">
            <Input className='w-full' type="search" placeholder="Search" onChange={(e)=>setQuery(e.target.value)} />
            <Button type="submit" className='w-fit' onClick={search}>Search</Button>
            
        </div>

    )
}

export default SearchBar