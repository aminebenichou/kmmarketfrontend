'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { signup } from '../requests'
import Link from 'next/link'

const SignUpPage = () => {
  
    const [data, setData] = useState({
        username:'',
        password:''
    })

    function handleLogin(e:any) {
        e.preventDefault()
        signup("client/", data)
    }
    
    return (
        <div>
            <center>
                <Card className='w-1/3 p-20'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action="" method="post">
                            <Label>Username:</Label>
                            <Input onChange={(e)=>setData({...data, username:e.target.value})} type='text' className='my-5' />
                            <Label>Password:</Label>
                            <Input onChange={(e)=>setData({...data, password:e.target.value})} type='password' className='my-5'/>
                            <Button onClick={handleLogin} className='my-5 w-full'>
                                Sign Up
                            </Button>
                            <p>You already have an account? <br /> <Link className='font-bold' href="/login">Sign In Here</Link> </p>
                        </form>
                    </CardContent>
                </Card>
            </center>
        </div>
    )
}

export default SignUpPage