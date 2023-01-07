import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import * as jwt from "jsonwebtoken";
import OfAgeSplashPage from "../components/OfAgeSplashPage";
import { useState, useEffect } from "react";

function isJwtValid(token: string): boolean {
  try {
    const decodedToken: any = jwt.decode(token);
    if (!decodedToken || !decodedToken.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime < decodedToken.exp;
  } catch (error) {
    return false;
  }
}

export default function Home() {
  const [over21, setOver21] = useState(false);

  useEffect(() => {
    const test: any = localStorage.getItem("ofAge");
    if (test && isJwtValid(test)) {
      setOver21(true);
    }
  }, []);

  if (over21) {
    return (
      <div className="w-full min-h-screen flex justify-center">
        <div className="w-full md:w-[90%] max-w-6xl min-h-screen flex flex-col items-center">
          <Hero />
          <FeaturedProducts />
        </div>
      </div>
    );
  }

  return <OfAgeSplashPage setOver21={setOver21} />;
}
