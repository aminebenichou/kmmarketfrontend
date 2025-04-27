"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const SearchBar = () => {

    const [query, setQuery] = useState("")

    function search() {
        console.log(query)
    }

    return (
        <div className="flex justify-center items-center w-full max-w-sm space-x-2">
            <Input className='w-full' type="search" placeholder="Search" onChange={(e)=>setQuery(e.target.value)} />
            <Button type="submit" className='w-fit' onClick={search}>Search</Button>
            
        </div>

    )
}

export default SearchBar