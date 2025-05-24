'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { fetchData, postData } from '@/app/requests'

export interface Category {
  id: number
  name: string
  description: string
}

const AddProductPage = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
  })

  const sampleCategories: Category[] = [
    { id: 1, name: 'Electronics', description: 'Devices, gadgets, and accessories' },
    { id: 2, name: 'Books', description: 'Fiction, non-fiction, educational' },
    { id: 3, name: 'Clothing', description: 'Apparel for men, women, and children' },
    { id: 4, name: 'Home & Kitchen', description: 'Furniture, appliances, and decor' },
    { id: 5, name: 'Sports', description: 'Sporting goods and outdoor gear' },
    { id: 6, name: 'Health & Beauty', description: 'Cosmetics, supplements, and wellness' },
    { id: 7, name: 'Toys', description: 'Toys, games, and educational items for kids' },
    { id: 8, name: 'Office Supplies', description: 'Stationery, printers, and accessories' },
    { id: 9, name: 'Automotive', description: 'Car parts, tools, and accessories' },
    { id: 10, name: 'Garden', description: 'Gardening tools, plants, and decor' },
  ]
  
  
  const [image, setImage] = useState<File | null>(null)
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  useEffect(() => {
    // Fetch category list
    const fetchCategories = async () => {
      const data : any = await fetchData('catgeories/')
      console.log(data)
      setCategories(data as Category[])
    }

    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, option => Number(option.value))
    console.log(values)
    setSelectedCategories(values)
  }

  const formDataToObject = (formData: FormData): Record<string, any> => {
    const obj: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
      obj[key] = value
    }
    return obj
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const body = new FormData()
    body.append('title', formData.title)
    body.append('description', formData.description)
    body.append('price', formData.price.toString())
    body.append('category', selectedCategories[0].toString())
  
    if (image) {
      body.append('image', image)
    }
  
    // Debug: Inspect FormData entries
    for (const [key, value] of body.entries()) {
      console.log(`${key}:`, value)
      
    }

    const data = formDataToObject(body)
    data.price = parseInt(formData.price.toString())
    data.category = parseInt(selectedCategories[0].toString())
    console.log(data);
    
    // Send the request
    const res = await postData("products/", body, "multipart/form-data")
  
    if (res) {
      router.push('/seller/dash')
    } else {
      console.error('Failed to add product')
    }
  }
  
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="categories">Categories</Label>
          <select
            id="categories"
            multiple
            value={selectedCategories.map(String)}
            onChange={handleCategorySelect}
            className="w-full border rounded p-2"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="image">Product Image</Label>
          <Input id="image" name="image" type="file" onChange={handleImageChange} />
        </div>

        <Button type="submit">Add Product</Button>
      </form>
    </div>
  )
}

export default AddProductPage
