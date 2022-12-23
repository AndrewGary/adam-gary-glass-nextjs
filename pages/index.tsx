import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import * as jwt from 'jsonwebtoken';
import OfAgeSplashPage from '../components/OfAgeSplashPage'
import { useState, useEffect } from 'react';

function isJwtValid(token: string): boolean {
  try {
    // Decode the JWT to get the expiration time (exp) claim.
    const decodedToken: any = jwt.decode(token);
    if (!decodedToken || !decodedToken.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime < decodedToken.exp;
  } catch (error) {
    return false;
  }
}

export default function Home() {

  const [over21, setOver21] = useState(false);

  useEffect(() => {
    const test: any = localStorage.getItem('ofAge');
    if(test && isJwtValid(test)){
      setOver21(true);
    }
  }, [])

  if(over21){
    return (
      <div className='w-full min-h-screen flex flex-col items-center'>
        <Hero />
        <FeaturedProducts />
      </div>
    )
    
  }

  return (
    <OfAgeSplashPage setOver21={setOver21}/>
  )
  
}
