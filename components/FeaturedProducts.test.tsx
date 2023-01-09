import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EnlargedImage from "./EnlargedImage";
import FeaturedProducts from "./FeaturedProducts";

jest.mock("node-fetch", () =>
  jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve([
        {
          _id: "63aad8c267b656d256b08955",
          name: "Fumed Floating ",
          description: "10mm Fumed Floating recycler with a matching fume marble attached to the return.",
          price: 100,
          quantity: 2,
          images: [
            "https://res.cloudinary.com/andrewg0427/image/upload/v1672140938/n21jqkzft8mx26vaa8a0.png",
            "https://res.cloudinary.com/andrewg0427/image/upload/v1672140948/qzc2vuehzdrrlyi3oj7n.png",
            "https://res.cloudinary.com/andrewg0427/image/upload/v1672140948/qzc2vuehzdrrlyi3oj7n.png",
            "https://res.cloudinary.com/andrewg0427/image/upload/v1672140949/retbrdyqrlv2tfnqcgqv.png",
          ],
          defaultImage: "https://res.cloudinary.com/andrewg0427/image/upload/v1672140938/n21jqkzft8mx26vaa8a0.png",
          time: 1672140994109,
        },
      ]),
  })
);

describe("FeaturedProducts Component", async () => {
  it("Renders Correctly", () => {
    render(<FeaturedProducts />);
  });
});
