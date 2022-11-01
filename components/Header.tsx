import React, { useState, useEffect } from "react";
import Link from 'next/link'

const options = [
    {
        text: 'Shop',
        href: '/Products',
    },
    {
        text: 'Login',
        href: '',
    },
    {
        text: 'Purchase/Return Policy',
        href: '',
    },
    {
        text: 'Contact',
        href: '',
    },
]

type Props = {};

const Header = (props: Props) => {
  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full">

        <div className={`${searchActive ? '' : 'hidden'} w-full flex justify-between sticky top-0 bg-white`}>
        <div className={`h-full border ml-2 mt-2`} onClick={() => {setHamburgerMenuActive(!hamburgerMenuActive)}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
                </svg>
            </div>

            <div className="h-full border mt-2 flex space-x-2">
            
                <input
                    type='text'
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                    className='border border-black'
                    placeholder="Search site..."
                />
                <Link href={`/Search/${searchTerm}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        </Link>
            </div>

            <div className="h-full border mr-2 mt-2 flex space-x-3">
            <Link href='/Cart'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        </Link>
        <svg onClick={() => {setSearchActive(!searchActive)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

            </div>
        </div>

        <div className={`${hamburgerMenuActive ? '' : 'hidden'} w-full flex flex-col`}>
            <div className="ml-2 mt-2 flex w-full" onClick={() => {setHamburgerMenuActive(!hamburgerMenuActive)}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
                </svg>   
                Close
            </div>
            <div className="w-full flex flex-col border-2 border-black">
                {options.map((option, i) => (
                    <Link key={i} onClick={() => {setHamburgerMenuActive(false)}} href={option.href}>
                            {option.text}
                    </Link>
                ))}
            </div>
        </div>


        <div className={`${hamburgerMenuActive || searchActive ? 'hidden' : ''} w-full flex justify-between sticky top-0 bg-white`}>
            <div className={`h-full border ml-2 mt-2`} onClick={() => {setHamburgerMenuActive(!hamburgerMenuActive)}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
                </svg>
            </div>

            <div className="h-full border mt-2">Adam Gary Glass
            </div>

            <div className="h-full border mr-2 mt-2 flex space-x-3">
            <Link href='/Cart'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        </Link>
        <svg onClick={() => {setSearchActive(!searchActive)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

            </div>
        </div>
    </div>
  );
};

export default Header;
