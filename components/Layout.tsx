import React from 'react'
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import Footer from './Footer';

type Props = {
    children: JSX.Element
}

const Layout = ({children}: Props) => {
  return (
    <>
        <div className='lg:hidden'>
        <MobileHeader />
        </div>

        <div className='hidden lg:flex'>
          <DesktopHeader />
        </div>
        <div className='bg-gray-800 bg-opacity-25 py-2'>
        {children}
        </div>
        <Footer />
    </>
  )
}

export default Layout