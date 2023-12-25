import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Home from "../../src/components/Home";

test("Renders the home page", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});
