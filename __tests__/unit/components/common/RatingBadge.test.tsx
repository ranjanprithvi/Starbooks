import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import RatingBadge from "../../../../src/components/common/RatingBadge";
import React from "react";

describe("RatingBadge", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<RatingBadge rating={3} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
