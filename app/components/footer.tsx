import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Facebook, Instagram, LucideProps, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type SocialLink = {
    link: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  };
const Footer = () => {
    const social: SocialLink[] = [
        {link:'fb.com', icon:Facebook},
        {link:'twitter.com', icon:Twitter},
        {link:'instgram.com', icon:Instagram},
    ]
    return (
        <footer className='bg-gray-200'>
            <div className='h-fit py-10 bg-gray-200 flex justify-evenly '>
                <div className='w-[300] flex justify-center items-center'>
                    <img className='w-50' src="./logo-removebg.png" alt="" />
                </div>
                <div className='py-5'>
                    <h3>Nouveau sur KMMARKET ?</h3>
                    <p>Inscrivez-vous à nos communications pour recevoir nos meilleures offres !</p>
                    <div className='flex items-center'>
                        <Input className='border-2 border-primary' type='email' placeholder='Entrez votre adresse e-mail' />
                        <Button className='mx-2'>S&apos;abonner</Button>
                    </div>
                    <div className='flex justify-start items-end'>

                        <Checkbox id='terms' className='mr-2 my-5 bg-white' />
                        <Label>J&apos;accepte la Politique de confidentialité et des cookies de KMMARKET <br /> et je comprends que je peux me désabonner des newsconstters <br /> à tout moment.
                            J&apos;accepte les conditions légales</Label>
                    </div>

                    <div className='flex justify-startitems-center my-10'>
                        <Link className='mr-10 font-bold' href='/seller'>Become a Seller</Link>
                        <Link className='mr-10 font-bold' href='/seller/subscriptions'>KM PRO</Link>
                        <Link className='mr-10 font-bold' href='/seller/dash'>Seller Dashboard</Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>

            <center className='flex justify-evenly items-center w-36 py-12'>
                {
                    social.map((item:SocialLink , index:number)=><Link key={index} href={item.link}><item.icon /></Link>)
                }
            </center>
            </div>
        </footer>
    )
}

export default Footer