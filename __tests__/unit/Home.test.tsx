import "@testing-library/jest-dom";
import Home from "../../src/components/Home";
import { render } from "@testing-library/react";

test("demo", () => {
    expect(1).toBe(1);
});

test("Renders the main page", () => {
    render(<Home />);
    expect(true).toBeTruthy();
});
