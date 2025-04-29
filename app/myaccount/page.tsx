
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { fetchData } from "../requests";
import { useAuth } from "../providers/AuthProviderClient";
import { Loader2, LoaderIcon } from "lucide-react";

export default function ProfilePage() {
    const [data, setData] = useState<any>()
    const [isLoading, setIsLoading] = useState(true)
    const {isAuthenticated, token} = useAuth()
    useEffect(()=>{
        fetchData("userInfo", {
            headers:{
                Authorization: `Token ${token}`
            }
        }).then((response)=>{
            setData(response)
            setIsLoading(false)
        })
    },[])
    console.log(data);

    
    return (
        

            <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            { isLoading ?
                <Loader2 className="animate-spin" size={32} />
            :
            <Card className="w-full max-w-md rounded-2xl shadow-lg">
                <CardHeader className="flex flex-col items-center gap-4 pt-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="/avatar.jpg" alt="Profile Picture" />
                        <AvatarFallback>{data.username}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                    <CardTitle className="text-2xl font-semibold">{data.username}</CardTitle>
                        <CardDescription className="text-muted-foreground text-sm">john.doe@example.com</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-6 px-6 pb-8">
                    <div className="text-sm text-muted-foreground">
                        <p className="text-center">
                            Software engineer with a passion for building beautiful and functional web applications. Loves coffee, coding, and cats.
                        </p>
                    </div>

                    <Button className="w-full" variant="default">
                        Edit Profile
                    </Button>
                </CardContent>
            </Card>}
        </div>
    );
}
