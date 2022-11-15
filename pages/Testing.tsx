import React, { useState, useEffect } from 'react'

const initialState = [
    {
        height: 'h-[50px] bg-black w-[30px]',
        color: ''
    },
    {
        height: 'h-[100px] bg-black w-[30px]',
        color: ''
    },
    {
        height: 'h-[299px] bg-black w-[30px]',
        color: ''
    },
    {
        height: 'h-[20px] bg-black w-[30px]',
        color: ''
    },
    {
        height: 'h-[100px] bg-black w-[30px]',
        color: ''
    },

]

type Props = {}

const Testing = (props: Props) => {
    const [ arrayState, setArrayState ] = useState(initialState)


  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <div className='w-full flex items-end space-x-1'>
            {arrayState.map((column, i) => {
                return (
                <div className={column.height}>

                </div>
            )})}
        </div>

        <button className='border border-black px-3' onClick={() => {

        }}>
            Increase
        </button>
    </div>
  )
}

export default Testing