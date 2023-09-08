import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";

it("renders corrently", () => {
  const { queryByTestId } = render(<Dashboard />);

  expect(queryByTestId("Dashboard")).toBeTruthy();
});

// test("renders learn react link", () => {
//   const { getByText } = render(<Header />);
//   const linkElement = getByText(/THE GIFT GUIDE/i);
//   expect(linkElement).toBeInTheDocument();
// });
