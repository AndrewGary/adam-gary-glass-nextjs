import React, { useState, useEffect } from 'react'

const initialState = {
    name: '',
    email: '',
    subject: '',
    message: ''
}

type Props = {}

const Contact = (props: Props) => {

    const [formValues, setFormValues] = useState(initialState);

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div className='border border-black w-full min-h-screen flex flex-col justify-center items-center'>
        <h1 className='mb-3 text-2xl uppercase underline'>How can I help?</h1>
        <form className='w-[85%] flex flex-col space-y-3 items-center' onSubmit={handleSubmit}>
            <input
                type='text'
                onChange={handleChange}
                value={formValues.name}
                name='name'
                className='border border-black pl-2 w-[80%]'
                placeholder='Name...'
            />

            <input
                type='text'
                onChange={handleChange}
                value={formValues.email}
                name='email'
                className='border border-black pl-2 w-[80%]'
                placeholder='Email...'
            />

            <input
                type='text'
                onChange={handleChange}
                value={formValues.subject}
                name='subject'
                className='border border-black pl-2 w-[80%]'
                placeholder='Subject...'
            />

            <input
                type='text'
                onChange={handleChange}
                value={formValues.message}
                name='message'
                className='border border-black pl-2 w-[80%]'
                placeholder='Message...'
            />

            <button className='border border-black rounded-md text-center w-1/2'>Submit</button>
        </form>
    </div>
  )
}

export default Contact