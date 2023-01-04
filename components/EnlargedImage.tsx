// import React from 'react'

// type Props = {image: string}

// const EnlargedImage: React.FC<Props> = ({image}) => {
//   return (
//     <div className='absolute flex w-full min-h-screen justify-center items-centers z-10'>
//       <div className='bg-black'>
//         <img className=' h-96' src={image} alt={image} />
//       </div>
//     </div>
//   )
// }

// export default EnlargedImage

import React, { useState } from 'react'

type Props = {image: string}

const EnlargedImage: React.FC<Props> = ({image, setFocusImage}) => {

  const [darkMode, setDarkMode] = useState(true);
  
  return (
    
      <div className={` relative ${darkMode ? 'bg-black' : 'bg-white'} rounded-md bg-opacity-90`}>
        <img className=' h-96 m-5' src={image} alt={image} />
        <img src={darkMode ? '/NightIcon.png' : '/DayIcon.png'} alt=''  className='absolute left-2 top-2 hover:opacity-50 transition-all' onClick={() => {
          setDarkMode(!darkMode)
        }}/>
        <img src={darkMode ? '/NightExit.png' : '/DayExit.png'} alt=''  className='absolute z-10 right-2 top-2' onClick={() => {setFocusImage('')}}/>
      </div>
  )
}

export default EnlargedImage