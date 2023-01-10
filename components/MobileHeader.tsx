import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react";
import SVGIcon from "./SVGIcon";

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

const MobileHeader = (props: Props) => {
	const { data: session } = useSession();

	const cartLength = useSelector((state: any) => state.cart.numberOfItems);

	const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
	const [searchActive, setSearchActive] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className="w-full bg-gray-800 text-white flex flex-col justify-center py-2 transition-all">
			<div className="w-full flex">
				<div onClick={() => {
          setHamburgerMenuActive(!hamburgerMenuActive)
        }} className="w-1/5 flex justify-start items-center pl-2">
					{/* <svg
						data-testid="hamburgerMenuIcon"
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
					</svg> */}
          <SVGIcon type='hamburgerMenu' />
				</div>

				<div className="w-3/5 flex justify-center items-center">
					<Link href='/'>
            <h1>Adam Gary Glass</h1>
          </Link>
				</div>

				<div className="w-1/5 flex justify-end items-center pr-2 space-x-1">
					<div className="relative">
						<div className="absolute w-3 h-3 rounded-full flex justify-center items-center left-3 text-[#ff3434] bottom-4 font-bold p-2">
							{cartLength}
						</div>
						<Link href="/Cart">
              <SVGIcon type='shoppingCart' />
							
						</Link>
					</div>
          <div onClick={() => {
							setSearchActive(!searchActive);
						}}>
          <SVGIcon type='searchIcon'/>
					
          </div>
				</div>
			</div>

			<div className={`${hamburgerMenuActive ? 'flex ' : 'hidden '} flex-col`}>
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

      <div className={`${searchActive ? 'flex ' : 'hidden '} justify-center w-full mt-1`}>
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
		</div>
	);
};

export default MobileHeader;
