'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { login } from '../requests'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const LoginPage = () => {

    const [data, setData] = useState({
        username:'',
        password:''
    })

    function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        login("login/", data).then((data)=>data && redirect("/"))
    }
    return (
        <div>
            <center>
                <Card className='w-1/3 p-20'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action="" method="post">
                            <Label>Username:</Label>
                            <Input onChange={(e)=>setData({...data, username:e.target.value})} type='text' className='my-5' />
                            <Label>Password:</Label>
                            <Input onChange={(e)=>setData({...data, password:e.target.value})} type='password' className='my-5'/>
                            <Button onClick={handleLogin} className='my-5 w-full'>
                                Login
                            </Button>
                            <p>You don`&apos;`t have an account? <br /> <Link className='font-bold' href="/signup">Sign Up Here</Link> </p>
                            <p><br /> <Link className='font-bold' href="/seller">Become a Seller</Link> </p>
                        </form>
                    </CardContent>
                </Card>
            </center>
        </div>
    )
}

export default LoginPage