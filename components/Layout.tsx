import React from 'react'
import Header from './Header'
import Footer from './Footer';
import {Quicksand} from '@next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-1'
})

type Props = {
    children: JSX.Element
}

const Layout = ({children}: Props) => {
  return (
    <>
        <Header />
        <div className={`${quicksand.variable} font-sans bg-gray-800 bg-opacity-25 py-2`}>
        {children}
        </div>
        <Footer />
    </>
  )
}

export default Layout

// export default function Layout({ children }) {
//   return (
//     <>
//       <Navbar />
//       <main>{children}</main>
//       <Footer />
//     </>
//   )
// }