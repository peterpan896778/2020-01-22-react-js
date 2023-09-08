import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Banner from "./Banner";

it("renders corrently", () => {
  const { queryByTestId } = render(<Banner />);

  expect(queryByTestId("Banner")).toBeTruthy();
});

// test("renders learn react link", () => {
//   const { getByText } = render(<Header />);
//   const linkElement = getByText(/THE GIFT GUIDE/i);
//   expect(linkElement).toBeInTheDocument();
// });
