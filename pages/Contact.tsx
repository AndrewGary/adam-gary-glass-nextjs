import React, { useState } from 'react'

type Props = {}

const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
}

const Contact = (props: Props) => {

    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        window.location.href = `mailto:andrew.gary91@gmail.com?subject=${formValues.subject}&body=${formValues.message}`
    }


  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <h1>Contact Us</h1>

        <form className='flex flex-col space-y-2 w-[80%] mx-auto items-center' onSubmit={handleSubmit}>
                    <div className='flex flex-col space-y-2 md:flex-row md:space-x-2 w-full'>
                        <input 
                            value={formValues.name}
                            name='name'
                            type='text' 
                            className='contactInput border border-black pl-1'
                            placeholder='Name'
                            onChange={handleChange}
                        />
                        <input 
                            value={formValues.email}
                            type='email' 
                            className='contactInput border border-black pl-1'
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                        />
                    </div>

                    <input 
                        value={formValues.subject}
                        type='text' 
                        className='contactInput border border-black pl-1 w-full'
                        placeholder='Subject'
                        name='subject'
                        onChange={handleChange}
                    />

                    <textarea 
                        value={formValues.message}
                        className='contactInput border border-black pl-1 w-full'
                        placeholder='Message'
                        name='message'
                        onChange={handleChange}
                    />
                    
                    <button type='submit' className='border border-black py-2 px-10 rounded-md text-black font-bold text-lg w-1/2'>
                        Submit
                    </button>
                </form>
    </div>
  )
}

export default Contact