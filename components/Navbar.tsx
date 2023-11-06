import React from 'react'
import Link from 'next/dist/client/link'
import { Image } from 'next/dist/client/image-component'
import { NavLinks } from '@/constants'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/lib/session'


const Navbar = async() => {
    const session = await getCurrentUser();
  return (
    <nav className='flexBetween navbar'>
        {/* <div className='flex-1 flexStart gap-10'>Navbar</div> */}
        <div>
            <Link href="/">
                <Image src="/logo.svg" width={115} height={43} alt='flexiblee'/> 
            </Link>
            <ul className='xl:flex hidden text-small gap-7'>
                {NavLinks.map((link) => (
                    <Link href={link.href} key={link.key}> {link.text}</Link>
                ))}
            </ul>
        </div>

        <div className='flexCenter gap-4'>
            {session ?.user ? (
                <>
                    UserPhoto

                    <Link href="/create-project">
                        Share Work
                    </Link>
                    
                </>
            ):(
                <AuthProviders/>
            )}

        </div>
        
        
    </nav>
    
  )
}

export default Navbar