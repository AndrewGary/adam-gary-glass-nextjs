import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EnlargedImage from "./EnlargedImage";
import '@testing-library/react'

describe("EnlargedImage", () => {
  it("renders the image", () => {
    const image = "/test-image.jpg";
    const yeah = render(<EnlargedImage image={image} setFocusImage={jest.fn()} />);

    const idk = yeah.findByAltText(image);

    expect(idk).toBeTruthy();
  });

  it("toggles the dark mode when the night/day icon is clicked", () => {
    const image = "/test-image.jpg";

    const component = render(<EnlargedImage image={image} setFocusImage={jest.fn()} />);

    const dayNightIcon = component.getByAltText('dayNightIcon');

    fireEvent.click(dayNightIcon);


    expect(dayNightIcon.getAttribute('src')).toEqual('/DayIcon.png');
    fireEvent.click(dayNightIcon);
    expect(dayNightIcon.getAttribute('src')).toEqual('/NightIcon.png');

  });

  it("calls the `setFocusImage` function when the exit icon is clicked", () => {
    const image = "/test-image.jpg";
    const setFocusImage = jest.fn();

    const component = render(<EnlargedImage image={image} setFocusImage={setFocusImage} />) 

    const exitIcon = component.getByAltText('exit icon');

    fireEvent.click(exitIcon);
    expect(setFocusImage).toHaveBeenCalledWith('');
  });
});
