'use client'
import TlemcenMap from '@/app/components/tlemcenMap'
import { fetchData } from '@/app/requests'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Tracking = {
  order: unknown
  status: string | 'pending'
}

const MapsTracking = () => {
  const params = useParams()
  const trackingNumber = params.ordernumber
  console.log(trackingNumber);

  const [tracking, setTracking] = useState<Tracking>({
    order: {
      order_number: 1203,
      status: 'confirmed',
    },
    status: 'on route'
  })

  useEffect(() => {
    fetchData(`tracking/by-order/?tracking=${trackingNumber}`).then((data: unknown) => {
      setTracking(data)
    })
  }, [trackingNumber])

  console.log(tracking);


  return (
    <div className='p-5 flex flex-col md:flex-row justify-between items-start'>
      <Card className='w-1/2 m-3'>
        <CardHeader>
          <CardTitle>Map Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <TlemcenMap />
        </CardContent>
      </Card>
      <Card className='w-1/2 m-3 h-full'>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col md:flex-row justify-start items-center'>
            <Label className='font-bold pr-5'> Order Number : </Label>
            <p> {trackingNumber} </p>
          </div>
          <div className='flex flex-col md:flex-row justify-start items-center'>
            <Label className='font-bold pr-5'> Order Status : </Label>
            <p> {tracking.order?.status}</p>
          </div>
          <div className='flex flex-col md:flex-row justify-start items-center'>
            <Label className='font-bold pr-5'> Tracking Status : </Label>
            <p> {tracking.status}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MapsTracking