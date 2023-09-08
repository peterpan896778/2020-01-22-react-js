import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Footer from "./Footer";

it("renders corrently", () => {
  const { queryByTestId } = render(<Footer />);

  expect(queryByTestId("Footer")).toBeTruthy();
});

// test("renders learn react link", () => {
//   const { getByText } = render(<Header />);
//   const linkElement = getByText(/THE GIFT GUIDE/i);
//   expect(linkElement).toBeInTheDocument();
// });
