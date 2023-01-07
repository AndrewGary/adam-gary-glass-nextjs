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
            className=" md:text-2xl w-44 h-44 md:h-64 md:w-64 lg:h-80 lg:w-80 button-styles flex justify-center items-center mt-1"
          >
            4 New Messages
          </Link>
        </div>

        <div className="w-1/2 min-h-[50%] flex justify-center items-center">
          <Link
            href={"/Orders"}
            className=" md:text-2xl w-44 h-44 md:h-64 md:w-64 lg:h-80 lg:w-80 button-styles flex justify-center items-center mt-1"
          >
            {props.allOrders.length} Open Orders
          </Link>
        </div>

        <div className="w-1/2 min-h-[50%] flex justify-center items-center">
          <Link
            className="md:text-2xl w-44 h-44 md:h-64 md:w-64 lg:h-80 lg:w-80 button-styles flex justify-center items-center mt-1"
            href={"/AddNewProduct"}
          >
            Add New Product
          </Link>
        </div>
        <div className="w-1/2 min-h-[50%] flex justify-center items-center">
          <Link
            className="md:text-2xl w-44 h-44 md:h-64 md:w-64 lg:h-80 lg:w-80 button-styles flex justify-center items-center mt-1"
            href={"/EditProducts"}
          >
            Edit Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
