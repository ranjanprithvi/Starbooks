import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../../../src/components/common/Modal";

describe("Modal", () => {
    test("renders modal with correct header and body", () => {
        const headerText = "Test Header";
        const bodyText = "Test Body";
        const renderFooter = jest.fn();

        render(
            <Modal
                isOpen={true}
                onClose={jest.fn()}
                header={headerText}
                body={bodyText}
                renderFooter={renderFooter}
            />
        );

        const headerElement = screen.getByText(headerText);
        const bodyElement = screen.getByText(bodyText);

        expect(headerElement).toBeInTheDocument();
        expect(bodyElement).toBeInTheDocument();
    });

    test("calls onClose when modal is closed", () => {
        const onClose = jest.fn();

        render(
            <Modal
                isOpen={true}
                onClose={onClose}
                header=""
                body=""
                renderFooter={jest.fn()}
            />
        );

        const closeButton = screen.getByLabelText("Close");

        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalled();
    });

    test("renders footer correctly", () => {
        const renderFooter = jest.fn(() => <button>Test Button</button>);

        render(
            <Modal
                isOpen={true}
                onClose={jest.fn()}
                header=""
                body=""
                renderFooter={renderFooter}
            />
        );

        const footerButton = screen.getByText("Test Button");

        expect(footerButton).toBeInTheDocument();
    });
});
