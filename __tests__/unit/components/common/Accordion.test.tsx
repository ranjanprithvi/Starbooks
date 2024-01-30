import React from "react";
import renderer from "react-test-renderer";
import AccordionTable from "../../../../src/components/common/Accordion";

describe("AccordionTable", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <AccordionTable
                    data={[
                        {
                            mainContent: "test",
                            subContent: "test",
                        },
                    ]}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
