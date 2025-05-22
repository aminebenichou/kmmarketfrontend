import Payment from '@/app/components/payment'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Subscribe = () => {
    const offers = [
        {
            name: 'KM',
            price: 'Free',
            period: 'month',
            features: [
                '✔️ Guide de vente sécurisé pas à pas',
                '✔️ Statistiques avancées & Analyse du marché',
                '✔️ Conseils pour améliorer la qualité de tes produits',
                '✔️ Aide au marketing automatique',
                '✔️ Amélioration automatique des annonces'
            ]
        },
        {
            name: 'KM Publicite',
            price: '2500',
            period: 'month',
            features: [
                '✔️ 1 Publicité boostée',
                '✔️ Mise en avant de l’annonce pendant 7 jours',
                '✔️ Réponse prioritaire aux messages',
                '✔️ Badge vendeur sérieux',
                '✔️ Assistance client prioritaire',
            ]
        },
        {
            name: 'KM PRO',
            price: '4000',
            period: 'month',
            features: [
                '✔️ Guide de vente sécurisé pas à pas',
                '✔️ Statistiques avancées & Analyse du marché',
                '✔️ Conseils pour améliorer la qualité de tes produits',
                '✔️ Aide au marketing automatique',
                '✔️ Amélioration automatique des annonces'
            ]
        }
    ]
    return (
        <div className='flex justify-between items-center'>
            {
                offers.map((offer, index) =>
                    <Card key={index} className='w-1/2 m-5 h-[450px] flex flex-col justify-between'>
                        <CardHeader className='w-full flex flex-col items-center'>
                            <CardTitle className='text-3xl font-bold'>
                                {offer.name}
                            </CardTitle>
                            <CardDescription className='flex flex-col justify-center items-center'>
                                <h1 className='text-3xl font-bold'>{offer.price} {offer.price !== 'Free' && 'DZD'}</h1>
                                per <strong> {offer.period} </strong>
                            </CardDescription>
                            <CardContent>
                                <ul>
                                    {
                                        offer.features.map((feature, index) =>
                                            <li className='' key={index}> {feature} </li>
                                        )
                                    }
                                </ul>
                            </CardContent>
                        </CardHeader>
                        <CardFooter className='w-full flex justify-center items-center'>
                            <Payment buttonTrigger='Get Started' />
                        </CardFooter>
                    </Card>
                )
            }

        </div>
    )
}

export default Subscribe