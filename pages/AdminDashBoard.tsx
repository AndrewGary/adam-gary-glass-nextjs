import React from "react";
import Link from "next/link";
import { connectToDatabase } from "../mongoConnection";

type Props = { allOrders: any[] };

export const getServerSideProps = async () => {
  const connection = await connectToDatabase();

  const db = connection.db;

  const results = await db.collection("orders").find({}).toArray();

  const stringifiedResults = JSON.stringify(results);

  const allOrders = JSON.parse(stringifiedResults);

  return {
    props: {
      allOrders: allOrders,
    },
  };
};

const AdminDashBoard = (props: Props) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
    <div className="w-[90%] max-w-6xl min-h-screen flex flex-wrap justify-evenly">
      
      <div className="w-1/2 min-h-[50%] flex justify-center items-center">
      <Link
        href={"/"}
        className=" w-44 h-44 md:h-64 md:w-64 lg:h-80 lg:w-80 button-styles flex justify-center items-center mt-1"
      >
        4 New Messages
      </Link>
      </div>

      <div className="w-1/2 min-h-[50%] flex justify-center items-center">
      <Link
        href={"/Orders"}
        className=" w-44 h-44 md:h-64 md:w-64 lg:h-80 lg:w-80 button-styles flex justify-center items-center mt-1"
      >
        {props.allOrders.length} Open Orders
      </Link>
      </div>

      <div className="w-1/2 min-h-[50%] flex justify-center items-center">
      <Link className="w-44 h-44 md:h-64 md:w-64 lg:h-80 lg:w-80 button-styles flex justify-center items-center mt-1" href={"/AddNewProduct"}>
        Add New Product
      </Link>
      </div>
      <div className="w-1/2 min-h-[50%] flex justify-center items-center">
      <Link className="w-44 h-44 md:h-64 md:w-64 lg:h-80 lg:w-80 button-styles flex justify-center items-center mt-1" href={"/EditProducts"}>
        Edit Products
      </Link>
      </div>
    </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center space-y-4 pt-2">
      <Link
        href={"/"}
        className="w-[85%] button-styles flex justify-center items-center h-16"
      >
        4 New Messages
      </Link>

      <Link
        href={"/Orders"}
        className="w-[85%] button-styles flex justify-center items-center h-16"
      >
        {props.allOrders.length} Open Orders
      </Link>

      <span className="w-[85%] flex underline">Actions</span>
      <div className="flex flex-col w-[85%] space-y-2">
        <Link
          className="pl-4 button-styles text-center"
          href={"/AddNewProduct"}
        >
          Add New Product
        </Link>
        <Link className="pl-4 button-styles text-center" href={"/EditProducts"}>
          Edit Products
        </Link>
      </div>

      <button
        className="button-styles"
        onClick={() => {
          const reqOpts = {
            method: "DELETE",
          };

          fetch("/api/products", reqOpts).then((resp) => {
            console.log(resp);
          });
        }}
      >
        Delete All Products
      </button>
    </div>
  );
};

export default AdminDashBoard;

// import React from 'react'
// import Link from 'next/link';
// import { connectToDatabase } from '../mongoConnection';

// type Props = { allOrders: any[]}

// export const getServerSideProps = async () => {

//     const connection = await connectToDatabase();

//     const db = connection.db;

//     const results = await db.collection('orders').find({}).toArray();

//     const stringifiedResults = JSON.stringify(results);

//     const allOrders = JSON.parse(stringifiedResults);

//     return {
//       props: {
//         allOrders: allOrders
//       }
//     }
//   }

// const AdminDashBoard = (props: Props) => {

//   return (
//     <div className='w-full min-h-screen flex flex-col items-center space-y-4 pt-2'>
//         <Link href={'/'} className='w-[85%] button-styles flex justify-center items-center h-16'>
//             4 New Messages
//         </Link>

//         <Link href={'/Orders'} className='w-[85%] button-styles flex justify-center items-center h-16'>
//             {props.allOrders.length} Open Orders
//         </Link>

//         <span className='w-[85%] flex underline'>Actions</span>
//         <div className='flex flex-col w-[85%] space-y-2'>
//             <Link className='pl-4 button-styles text-center' href={'/AddNewProduct'}>
//                 Add New Product
//             </Link>
//             <Link className='pl-4 button-styles text-center' href={'/EditProducts'}>
//                 Edit Products
//             </Link>
//         </div>

//         <button className='button-styles' onClick={() => {
//             const reqOpts = {
//                 method: 'DELETE'
//             }

//             fetch('/api/products', reqOpts)
//             .then(resp => {
//                 console.log(resp);
//             })
//         }}>Delete All Products</button>
//     </div>
//   )
// }

// export default AdminDashBoard
