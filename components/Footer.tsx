// import React from 'react'
// import Link from 'next/link';

// type Props = {}

// const Footer = (props: Props) => {
//   return (
//     <div className='w-full flex justify-evenly py-3 border-t border-black text-xs'>
//       <div className='flex flex-col h-full justify-center items-center'>
//       <Link href='/PurchasePolicy'>Purchase Policy</Link>
//       <Link href='/PurchasePolicy'>Purchase Policy</Link>

//       </div>
//       <div className='flex flex-col h-full justify-center items-center'>

//       <Link href='/ReturnPolicy'>Return Policy</Link>
//       <Link href='/ReturnPolicy'>Return Policy</Link>
//       <Link href='/ReturnPolicy'>Return Policy</Link>
//       </div>
//     </div>
//   )
// }

// export default Footer

import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-800 py-4 mt-3 text-white text-center text-xs overflow-hidden">
			<div className="container mx-auto">
				<div className=" tracking-tight bg-op relative flex flex-wrap justify-center">
					<div className="text-white absolute h-full flex justify-center items-center">
						<motion.div
							whileHover={{
								scale: 1.2,
								transition: { duration: 0.15 },
							}}
							whileTap={{
								scale: 1.1,
								opacity: 0.5,
								transition: { duration: 0.15 },
							}}
              className='md:hidden'
						>
							<SocialIcon
								bgColor="#8D9199"
								style={{ height: 35, width: 35, opacity: 0.5 }}
								url="instagram://user?username=https://www.instagram.com/adamgaryglass/"
							/>
						</motion.div>

            <motion.div
							whileHover={{
								scale: 1.2,
								transition: { duration: 0.15 },
							}}
							whileTap={{
								scale: 1.1,
								opacity: 0.5,
								transition: { duration: 0.15 },
							}}
              className='hidden md:block'
						>
							<SocialIcon
								bgColor="#8D9199"
								style={{ height: 35, width: 35, opacity: 0.5 }}
								url="https://instagram.com"
							/>
						</motion.div>
					</div>
					<div className="w-[50%] md:w-1/4 px-4">
						<Link className="block hover:opacity-25" href="/Contact">
							Contact
						</Link>
					</div>
					<div className="w-[50%] md:w-1/4 px-4">
						<Link className="block hover:opacity-25" href="/PurchasePolicy">
							Purchase Policy
						</Link>
					</div>
					<div className="w-[50%] md:w-1/4 px-4">
						<Link className="block hover:opacity-25" href="/Wholesale">
							Wholesale
						</Link>
					</div>
					<div className="w-[50%] md:w-1/4 px-4">
						<Link className="block hover:opacity-25" href="/ReturnPolicy">
							Return Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
