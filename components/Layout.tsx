import React from 'react'
import Header from './Header'
import Footer from './Footer';

type Props = {
    children: JSX.Element
}

const Layout = ({children}: Props) => {
  return (
    <>
        <Header />
        <div className='bg-gray-800 bg-opacity-25 py-2'>
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