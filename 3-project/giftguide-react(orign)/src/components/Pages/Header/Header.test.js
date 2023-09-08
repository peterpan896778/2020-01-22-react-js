import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Header from "./Header";

it("renders corrently", () => {
  const { queryByTestId } = render(<Header />);

  expect(queryByTestId("Header")).toBeTruthy();
});

// test("renders learn react link", () => {
//   const { getByText } = render(<Header />);
//   const linkElement = getByText(/THE GIFT GUIDE/i);
//   expect(linkElement).toBeInTheDocument();
// });
