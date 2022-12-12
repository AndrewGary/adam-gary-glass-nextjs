import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';

const PurpleAndGreen = () => {
  const [confirmation, setConfirmation] = useState(null);
  const [token, setToken] = useState(null);

  const confirmOver21 = () => {
    setConfirmation(true);
  };

  const confirmUnder21 = () => {
    setConfirmation(false);
  };

  useEffect(() => {
    if (confirmation === true) {
      const token = jwt.sign({ over21: true }, 'secret', { expiresIn: '24h' });
      setToken(token);
      localStorage.setItem('over21', token);
    }
  }, [confirmation]);

  return (
    <div className="bg-green text-purple p-4">
      <p className="font-bold text-xl mb-4">Are you over 21?</p>
      <button
        className="px-4 py-2 gradient-green-to-purple-lighter rounded-lg border border-purple hover:bg-purple hover:text-green-light focus:outline-none focus:shadow-outline-purple mr-4"
        onClick={confirmOver21}
      >
        Yes
      </button>
      <button
        // className="px-4 py-2 bg-gradient-green-to-purple-lighter rounded-lg border border-purple hover:bg-purple hover:text-green-light focus:outline-none focus:shadow-outline-purple"
        className="px-4 py-2 bg-gradient-green-to-purple-lighter rounded-lg border border-purple hover:bg-purple hover:text-green-light focus:outline-none focus:shadow-outline-purple"

        onClick={confirmUnder21}
      >
        No
      </button>
    </div>
  );
};

export default PurpleAndGreen;