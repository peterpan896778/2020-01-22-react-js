import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("renders corrently", () => {
  const { queryByTestId } = render(<Card />);

  expect(queryByTestId("Card")).toBeTruthy();
});

// test("renders learn react link", () => {
//   const { getByText } = render(<Header />);
//   const linkElement = getByText(/THE GIFT GUIDE/i);
//   expect(linkElement).toBeInTheDocument();
// });
