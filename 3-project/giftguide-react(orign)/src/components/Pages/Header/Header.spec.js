// import React from "react";
// import renderer from "react-test-renderer";
// import Header from "./Header";

function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// describe('Header', () => {
//   test('header snapshot renders ', () => {
//     const component = renderer.create(<Header />);
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });
