'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { CheckCircle, CheckCircle2,  Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Payment = ({ buttonTrigger }: { buttonTrigger: React.ReactNode }) => {

    const imgPath = 'https://play-lh.googleusercontent.com/RNixvQLeIChh3f0pfYQ2asBCMbjTw0tCBHLFObcnQ2DMftqPM9D5HatPW0MqqFR8vfY'
    const [loading, setLoading] = useState(false)
    const [payed, setPayed] = useState(false)

    function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function pay() {
        setLoading(true)

    }

    useEffect(() => {
        if (loading) {
            sleep(3000).then(()=>{
                setPayed(true)
                setLoading(false)
            })
        }
    }, [loading])


    return (
        <div>
            <Dialog>
                <DialogTrigger className=' p-3 bg-blue-600 flex justify-center items-center text-white rounded-2xl w-full'>
                    {buttonTrigger}
                </DialogTrigger>
                {
                    payed ?
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='w-full flex flex-col justify-center items-center'>
                                    <CheckCircle2 size={36} fill='green' color='white' />
                                    <p className='text-2xl'>
                                        Payed Successfully
                                    </p>
                                </DialogTitle>
                            </DialogHeader>
                        </DialogContent>
                        : <DialogContent>
                            {loading ?
                                <DialogHeader>
                                    <DialogTitle className='w-full flex justify-center items-center'>
                                        <Loader2 className='animate-spin' />
                                    </DialogTitle>
                                </DialogHeader>
                                : <DialogHeader>
                                    <DialogTitle>Pay your subscription</DialogTitle>
                                    <DialogDescription className='p-5'>
                                        <Input className='my-2' placeholder='Card Number' />
                                        <Input className='my-2' placeholder='CVV' />
                                        <Button onClick={pay} className='w-full'> <CheckCircle /> Pay Now</Button>
                                    </DialogDescription>
                                </DialogHeader>}
                            <DialogFooter>
                                <img width={100} src={imgPath} alt="" />
                            </DialogFooter>
                        </DialogContent>}
            </Dialog>
        </div>
    )
}

export default Payment