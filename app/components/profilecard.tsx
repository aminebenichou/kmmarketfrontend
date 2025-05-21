import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
export type UserType = {
    username: string,


}
const Profilecard = ({data}:{data:UserType}) => {
    return (
        <div className='w-full'>
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
            </Card>
        </div>
    )
}

export default Profilecard