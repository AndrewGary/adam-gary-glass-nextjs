import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react";

const options = [
  {
    text: "Shop",
    href: "/Products",
  },
  {
    text: "Login",
    href: "",
  },
  {
    text: "Purchase Policy",
    href: "/PurchasePolicy",
  },
  {
    text: "Return Policy",
    href: "/ReturnPolicy",
  },
  {
    text: "Contact",
    href: "/Contact",
  },
];

type Props = {};

const Header = (props: Props) => {
  const { data: session } = useSession();

  const cartLength = useSelector((state: any) => state.cart.numberOfItems);

  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div
        data-testid='mobile component'
        className={`w-full bg-gray-800 text-white flex items-center py-2 lg:hidden`}
      >
        <div
          className={`${
            searchActive ? "" : "hidden"
          } w-full flex justify-between sticky top-0`}
        >
          <div
            className={`h-full  ml-2 `}
            onClick={() => {
              setHamburgerMenuActive(!hamburgerMenuActive);
            }}
          >
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

          <div className="h-full   flex space-x-2">
            <input
              type="text"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="border border-black text-black pl-1"
              placeholder="Search site..."
            />
            <Link href={`/Search/${searchTerm}`}>
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Link>
          </div>

          <div className="h-full  mr-2  flex space-x-3">
            <Link href="/Cart">
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
            <svg
              onClick={() => {
                setSearchActive(!searchActive);
              }}
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div
          className={`${
            hamburgerMenuActive ? "" : "hidden"
          } w-full flex flex-col`}
        >
          <div
            className="ml-2  flex w-full"
            onClick={() => {
              setHamburgerMenuActive(!hamburgerMenuActive);
            }}
          >
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
          <div className="pl-2 w-full flex flex-col">
            {options.map((option, i) => {
              if (option.text === "Login") {
                if (session) {
                  return (
                    <span
                      key={i}
                      onClick={() => {
                        signOut();
                      }}
                      className="text-xl underline hover:opacity-25"
                    >
                      Sign Out
                    </span>
                  );
                } else {
                  return (
                    <span
                      key={i}
                      onClick={() => {
                        signIn();
                      }}
                      className="text-xl underline hover:opacity-25"
                    >
                      Sign In
                    </span>
                  );
                }
              } else {
                return (
                  <Link
                    key={i}
                    onClick={() => {
                      setHamburgerMenuActive(false);
                    }}
                    href={option.href}
                    className="text-xl underline hover:opacity-25"
                  >
                    {option.text}
                  </Link>
                );
              }
            })}
          </div>
        </div>

        <div
          className={`${
            hamburgerMenuActive || searchActive ? "hidden" : ""
          } w-full flex justify-between sticky top-0`}
        >
          <div
            className={`h-full  ml-2 `}
            onClick={() => {
              setHamburgerMenuActive(!hamburgerMenuActive);
            }}
          >
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

          <Link href={"/"}>
            <div className="h-full  ">Adam Gary Glass</div>
          </Link>

          <div className="h-full  mr-2  flex space-x-3">
            <div className="relative">
              <div className="absolute w-3 h-3 rounded-full flex justify-center items-center left-3 text-[#ff3434] bottom-4 font-bold p-2">
                {cartLength}
              </div>
              <Link href="/Cart">
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Link>
            </div>
            <svg
              onClick={() => {
                setSearchActive(!searchActive);
              }}
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div data-testid='desktop component' className="hidden lg:flex w-full bg-gray-800 text-white items-center py-4 text-xl">
        <div className="w-1/3 flex justify-evenly text-sm">
          {options.map((option, i) => {
            if (option.text === "Login") {
              if (session) {
                return (
                  <span
                    key={i}
                    onClick={() => {
                      signOut();
                    }}
                    className="hover:opacity-25"
                  >
                    Sign Out
                  </span>
                );
              } else {
                return (
                  <span
                    key={i}
                    onClick={() => {
                      signIn();
                    }}
                    className="hover:opacity-25"
                  >
                    Sign In
                  </span>
                );
              }
            } else {
              return (
                <Link
                  key={i}
                  onClick={() => {
                    setHamburgerMenuActive(false);
                  }}
                  href={option.href}
                  className="hover:opacity-25"
                >
                  {option.text}
                </Link>
              );
            }
          })}
        </div>

        <div className="w-1/3 flex justify-center">
          <Link href={"/"}>
            <div className="h-full  ">Adam Gary Glass</div>
          </Link>
        </div>

        <div className="w-1/3 flex justify-end items-center">
          <div className="flex items-center space-x-1">
            <input
              type="text"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="border border-black text-black pl-1 rounded-md"
              placeholder="Search site..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <div className="relative mr-5">
            <Link href="/Cart">
              <div className="absolute w-full h-full flex justify-center items-center text-[#ff3434] font-bold">
                <div className="absolute -top-3 right-0">{cartLength}</div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;