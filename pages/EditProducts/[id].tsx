import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { CldUploadButton } from "next-cloudinary";

type Props = {};

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number | undefined;
  quantity: number | undefined;
  images: string[];
  defaultImage: string;
}

const EditSpecificItem = (props: Props) => {
  const router = useRouter();

  const [productBeingEdited, setProductBeingEdited] = useState<any>({
    _id: "",
    name: "",
    description: "",
    price: undefined,
    quantity: undefined,
    images: [],
    defaultImage: "",
  });
  const [formValues, setFormValues] = useState<any>({
    _id: "",
    name: "",
    description: "",
    price: undefined,
    quantity: undefined,
    images: [],
    defaultImage: "",
  });

  const uploadedImages = useRef<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);

  const setUploadedImages = (newImage: string) => {
    uploadedImages.current.push(newImage);
    setNewImages([...newImages, newImage]);
  };

  const deleteUploadedImage = (imageToDelete: string) => {
    uploadedImages.current = uploadedImages.current.filter(
      (img) => img !== imageToDelete
    );

    setNewImages(newImages.filter((img) => img !== imageToDelete));
  };

  useEffect(() => {
    const asyncUseEffect = async () => {
      const resp = await fetch(`/api/products/${router.query.id}`);

      const parsedResp = await resp.json();
      console.log("parsedResp: ", parsedResp);

      const myFormValues: any = {
        _id: parsedResp._id,
        name: parsedResp.name,
        description: parsedResp.description,
        price: parseInt(parsedResp.price),
        quantity: parseInt(parsedResp.quantity),
        images: [...parsedResp.images],
        defaultImage: parsedResp.defaultImage,
      };

      setFormValues(myFormValues);

      setProductBeingEdited(myFormValues);
    };

    asyncUseEffect();
  }, []);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newValues: any = {};

    for (const key in formValues) {
      if (formValues[key] !== productBeingEdited[key]) {
        console.log("formValues[key]: ", formValues[key]);
        console.log("productBeingEdited[key]: ", productBeingEdited[key]);
        if (key === "price" || key === "quantity") {
          newValues[key] = parseInt(formValues[key]);
        } else if (key === "images") {
          newValues[key] = [...formValues[key]];
        } else {
          newValues[key] = formValues[key];
        }
      }
    }

    const reqOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newValues),
    };

    const yeahhh = await fetch(`/api/products/${formValues._id}`, reqOptions);

    const jeah = await yeahhh.json();

    //COME BACK HERE AND HANDLE IF IT WAS SUCCESSFULL OR NOT
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <h2 className="w-[70%] text-center mb-2">
        Change Default Image by selecting the image you want
      </h2>
      <div className={`flex flex-wrap justify-evenly w-full`}>
        {formValues.images.map((image: any, i: number) => {
          return (
            <div key={i} className="relative w-20 flex">
              <img
                onClick={() => {
                  setFormValues({
                    ...formValues,
                    images: formValues.images.filter(
                      (img: string) => image !== img
                    ),
                  });
                }}
                src="/trash.png"
                alt="delete image"
                className="border bg-opacity-50 bg-gray-400 rounded-sm top-0 right-0 w-6 h-6 absolute z-10"
              />
              <img
                onClick={() => {
                  setFormValues({
                    ...formValues,
                    defaultImage: image,
                  });
                }}
                className={`w-full h-auto ${
                  image === formValues.defaultImage
                    ? "border-2 border-red-500"
                    : ""
                }`}
                src={image}
                alt=""
              />
            </div>
          );
        })}
      </div>

      <h2>New Images</h2>
      <div className={`flex flex-wrap justify-evenly w-full`}>
        {uploadedImages.current.map((image: any, i: number) => {
          return (
            <div key={i} className="relative w-20 flex">
              <img
                onClick={() => {
                  deleteUploadedImage(image);
                }}
                src="/trash.png"
                alt="delete image"
                className="border bg-opacity-50 bg-gray-400 rounded-sm top-0 right-0 w-6 h-6 absolute z-10"
              />
              <img
                onClick={() => {
                  setFormValues({
                    ...formValues,
                    defaultImage: image,
                  });
                }}
                className={`w-20 ${
                  image === formValues.defaultImage
                    ? "border-2 border-red-500"
                    : ""
                }`}
                src={image}
                alt=""
              />
            </div>
          );
        })}
      </div>

      <CldUploadButton
        className="border border-black px-3 rounded-lg"
        onUpload={(error: any, result: any, widget: any) => {
          setUploadedImages(result.info.secure_url);
        }}
        uploadPreset="product upload"
      >
        Upload Images Here
      </CldUploadButton>
      <form className="w-[90%] flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="pl-1 border border-black rounded-md"
          value={formValues.name}
        />
        <label htmlFor="description">Description</label>
        <input
          type="textarea"
          name="description"
          onChange={handleChange}
          className="pl-1 border border-black rounded-md"
          value={formValues.description}
        />
        <div className="flex w-full justify-evenly">
          <div className="flex flex-col">
            <label className="w-[90%]" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              className="pl-1 border border-black rounded-md w-[90%]"
              value={formValues.price}
            />
          </div>

          <div className="flex flex-col">
            <label className="w-[90%]" htmlFor="quantity">
              Quantity
            </label>
            <input
              type=""
              name="quantity"
              onChange={handleChange}
              className="pl-1 border border-black rounded-md w-[90%]"
              value={formValues.quantity}
            />
          </div>
        </div>

        <div className="w-full flex justify-center mt-2">
          <button onClick={handleSubmit} className="w-1/2 button-styles">
            Save Changes
          </button>
        </div>
        <button
          onClick={() => {
            console.log();
          }}
          className="button-styles"
        >
          test
        </button>
      </form>
    </div>
  );
};

export default EditSpecificItem;
