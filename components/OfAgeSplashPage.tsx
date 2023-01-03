import React from "react";
import * as jwt from 'jsonwebtoken';

function createJWT(): string {

    const secretKey: string = process.env.NEXT_PUBLIC_JWT_SECRET || 'NotValid';

  const payload = {
    ofAge: true
  };

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '24h'
  });

  return token;
}

type Props = {setOver21: any};

const OfAgeSplashPage = (props: Props) => {

    const handleUnder21 = () => {

    }

    const handleOver21 = () => {
        const over21JWT = createJWT();

        localStorage.setItem('ofAge', over21JWT);

        props.setOver21(true);
    }

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			<div className="w-[90%] max-w-lg border border-black rounded-lg h-52 flex flex-col justify-center items-center">
				<div className="w-[90%] h-1/2 flex justify-center items-center text-3xl text-center">
					Are You over the age of 21?
				</div>

				<div className="w-full h-1/2 flex items-center justify-center space-x-4">
					<button onClick={handleOver21} className="md:text-2xl button-styles w-1/3 text-center py-4">
						Yes
					</button>
					<button onClick={handleUnder21} className="md:text-2xl button-styles w-1/3 text-center py-4">
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default OfAgeSplashPage;
