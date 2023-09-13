import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Reciept from "../Reciept/Reciept";

const mockProps = {
  subTotal: 0,
  vatTax: 0,
  discount: 0,
  cart:[
    { "name": "computer",
    "price": "130",
    "category": "computers",
    "description": "computer, laptops, desktop",
    "image": "https://freepngimg.com/convert-png/51784-desktop-computer-hq-image-free-png"
    }
  ],
  toggleReceipt: () => {},
  showReceipt: false,
};
describe("Product component", () => {
  it("renders without errors", () => {
    const comp = render(<Reciept {...mockProps}/>);
    const test = comp.getByText("Close");
    fireEvent.click(test)
    expect(comp).toBeTruthy()
  });
});
