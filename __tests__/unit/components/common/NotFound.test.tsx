import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import NotFound from "../../../../src/components/common/NotFound";
import React from "react";

test("Renders the NotFound page", () => {
    const tree = renderer.create(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
});
