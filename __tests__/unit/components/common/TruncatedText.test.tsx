import "@testing-library/jest-dom";
import React from "react";
import TruncatedText from "../../../../src/components/common/TruncatedText";
import { render, screen } from "@testing-library/react";

describe("TruncatedText", () => {
    it("renders the full text if text length is less than 20 characters", async () => {
        render(<TruncatedText text="This is a short text" />);

        expect(screen.getByText("This is a short text")).toBeInTheDocument();
    });

    it("renders trimmed text if text length is more than 20 characters", async () => {
        const text = "This is a long text that should be trimmed";
        render(<TruncatedText text={text} />);

        expect(screen.getByText(text.slice(0, 20) + "...")).toBeInTheDocument();
    });
});
