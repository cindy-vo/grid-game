import React from "react";
import { render, screen } from "@testing-library/react";
import GridGame from "./GridGame";

test("renders learn react link", () => {
  render(<GridGame />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
