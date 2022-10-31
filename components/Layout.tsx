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
        {children}
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