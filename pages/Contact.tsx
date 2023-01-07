import React, { useState } from "react";
type Props = {};

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = (props: Props) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
        subject: formValues.subject,
        message: formValues.message,
      }),
    };

    const yeah = await fetch("/api/contact", reqOptions);

    if (yeah.status === 200) {
      setFormMessage("Message successfully sent");
      setFormValues(initialValues);
      return;
    }

    setFormMessage("There was a problem sending the message, please try again");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="md:text-3xl mb-2">Contact Us</h1>

      <form
        className=" max-w-3xl flex flex-col space-y-2 w-[80%] mx-auto items-center"
        onSubmit={handleSubmit}
      >
        <div className="md:w-full md:flex md:flex-row md:space-x-1 flex flex-col w-full">
          <input
            value={formValues.name}
            name="name"
            type="text"
            className="w-full md:w-1/2 border border-black pl-1 mb-2 md:mb-0"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            value={formValues.email}
            type="text"
            className="w-full md:w-1/2 border border-black pl-1"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <input
          value={formValues.subject}
          type="text"
          className="contactInput border border-black pl-1 w-full"
          placeholder="Subject"
          name="subject"
          onChange={handleChange}
        />

        <textarea
          value={formValues.message}
          className="contactInput border border-black pl-1 w-full"
          placeholder="Message"
          name="message"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="button-styles py-2 px-10 font-bold text-lg w-1/2"
        >
          Submit
        </button>

        <div>{formMessage}</div>
      </form>
    </div>
  );
};

export default Contact;
