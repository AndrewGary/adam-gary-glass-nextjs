import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'

export default function Home() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <Hero />
      <FeaturedProducts />
    </div>
  )
}
