import React, { useEffect, useState } from "react";
import { usStates } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/orderSlice";
import OrderPreview from "../../components/OrderPreview";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";
import * as Yup from "yup";

const formValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address1: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip code is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  emailConfirmation: Yup.string()
    .email("Invalid email address")
    .required("Email confirmation is required")
    .oneOf([Yup.ref("email"), null], "Email confirmation does not match"),
});

type Props = {};

interface FormState {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  specialInstructions: string;
  email: string;
  emailConfirmation: string;
}

const initialErrorState = {
  firstName: "",
  lastName: "",
  address1: "",
  city: "",
  state: "",
  zip: "",
  phoneNumber: "",
  specialInstructions: "",
  email: "",
  emailConfirmation: "",
};

interface ErrorState {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  specialInstructions: string;
  email: string;
  emailConfirmation: string;
}

const initialState = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  phoneNumber: "",
  specialInstructions: "",
  email: "",
  emailConfirmation: "",
};

const FormError = (props: any) => {
  return <div className="text-sm mt-0 text-red-500">{props.error}</div>;
};

const Checkout1 = (props: Props) => {
  const router = useRouter();

  const cartState = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState<ErrorState>(initialErrorState);
  const [formTouched, setFormTouched] = useState({});

  const [formValues, setFormValues] = useState<FormState>(initialState);

  useEffect(() => {
    console.log("formErrors changed");
    console.log(formErrors);
  }, [formErrors]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    setFormTouched({
      ...formTouched,
      [e.target.name]: true,
    });
  };

  const handleBlur = (e: React.ChangeEvent<any>) => {
    setFormTouched({
      ...formTouched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formValidationSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        dispatch(
          createOrder({
            orderId: uuid(),
            order: cartState,
            customer: formValues,
            paymentMethod: "",
          })
        );
        router.push("/checkout/2");
      })
      .catch((errors) => {
        const validationErrors: any = {};
        errors.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        setFormErrors(validationErrors);
      });
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="max-w-3xl flex flex-col items-center w-[90%] mt-4">
        <OrderPreview />
        <h1 className="text-2xl">Shipping Address</h1>

        <form
          className="w-full flex flex-col space-y-3 items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full">
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`pl-1 border ${
                formErrors.firstName ? "border-red-500" : "border-black"
              } rounded-sm w-full`}
              placeholder="First Name..."
            />
            {formErrors.firstName ? (
              <FormError error={formErrors.firstName} />
            ) : null}
          </div>

          <div className="flex flex-col w-full">
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`pl-1 border ${
                formErrors.lastName ? "border-red-500" : "border-black"
              } rounded-sm w-full`}
              placeholder="Last Name..."
            />
            {formErrors.lastName ? (
              <FormError error={formErrors.lastName} />
            ) : null}
            {/* </div> */}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              name="address1"
              value={formValues.address1}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`pl-1 border ${
                formErrors.address1 ? "border-red-500" : "border-black"
              } rounded-sm w-full`}
              placeholder="Address"
            />
            {formErrors.address1 ? (
              <FormError error={formErrors.address1} />
            ) : null}
          </div>
          <input
            type="text"
            name="address2"
            value={formValues.address2}
            onBlur={handleBlur}
            onChange={handleChange}
            className="pl-1 border border-black rounded-sm w-full"
            placeholder="Apartment, suite, etc. (optional)"
          />
          <div className="flex flex-col w-full">
            <input
              type="text"
              name="city"
              value={formValues.city}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`pl-1 border ${
                formErrors.city ? "border-red-500" : "border-black"
              } rounded-sm w-full`}
              placeholder="City"
            />
            {formErrors.city ? <FormError error={formErrors.city} /> : null}
          </div>

          <div className="w-full flex justify-between">
            <div className="flex flex-col w-[38%]">
              <select
                name="state"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border ${
                  formErrors.state ? "border-red-500" : "border-black"
                } rounded-sm text-gray-400`}
              >
                <option>State</option>
                {usStates.map((state, i) => (
                  <option key={i} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {formErrors.state ? <FormError error={formErrors.state} /> : null}
            </div>

            <div className="w-[60%] flex flex-col">
              <input
                type="text"
                name="zip"
                value={formValues.zip}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`pl-1 w-full border ${
                  formErrors.zip ? "border-red-500" : "border-black"
                } rounded-sm`}
                placeholder="Zip Code"
              />
              {formErrors.zip ? <FormError error={formErrors.zip} /> : null}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <input
              type="email"
              name="email"
              value={formValues.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`pl-1 border ${
                formErrors.email ? "border-red-500" : "border-black"
              } rounded-sm w-full`}
              placeholder="Email"
            />
            {formErrors.email ? <FormError error={formErrors.email} /> : null}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="emailConfirmation"
              name="emailConfirmation"
              value={formValues.emailConfirmation}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`pl-1 border ${
                formErrors.emailConfirmation ? "border-red-500" : "border-black"
              } rounded-sm w-full`}
              placeholder="Confirm Email"
            />
            {formErrors.emailConfirmation ? (
              <FormError error={formErrors.emailConfirmation} />
            ) : null}
          </div>

          <div className="flex flex-col w-full">
            <input
              type="tel"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`pl-1 border ${
                formErrors.phoneNumber ? "border-red-500" : "border-black"
              } rounded-sm w-full`}
              placeholder="Phone Number"
            />
            {formErrors.phoneNumber ? (
              <FormError error={formErrors.phoneNumber} />
            ) : null}
          </div>

          <textarea
            className="pl-1 border border-black w-full rounded-sm"
            placeholder="Special Instructions"
            name="specialInstructions"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <button className="button-styles w-1/2" type="submit">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout1;
