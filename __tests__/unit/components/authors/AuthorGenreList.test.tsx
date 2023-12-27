// import React from "react";
// import renderer from "react-test-renderer";
// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import { act } from "react-dom/test-utils";
// import AuthorGenreList from "../../../../src/components/Authors/AuthorGenreList";
// import useAuthors from "../../../../src/hooks/useAuthors";
// import useGenres from "../../../../src/hooks/useGenres";
// import "@testing-library/jest-dom";
// import HttpService from "../../../../src/services/http-service";

// const mockedOnSelectAuthor = jest.fn();

// // mock HttpService
// jest.mock("../../../../src/services/http-service");
// const MockedHttpService = HttpService as jest.MockedClass<typeof HttpService>;
// new MockedHttpService("").post.((endPoint: string) => {
//     return {
//         post: jest.fn(),
//         delete: jest.fn(),
//         get: jest.fn(),
//         put: jest.fn(),
//         patch: jest.fn(),
//     };
// });
// // const MockedHttpService = HttpService as jest.Mocked<typeof HttpService>;

// // beforeEach(() => {
// //     HttpService.mockClear();
// // });

// // const mockedHttpObj = jest.fn();
// // mockedHttpService.mockImplementation(() => {});

// //mock useAuthors
// jest.mock("../../../../src/hooks/useAuthors");
// const mockedUseAuthors = useAuthors as jest.MockedFunction<typeof useAuthors>;

// //mock useAuthors
// jest.mock("../../../../src/hooks/useGenres");
// const mockedUseGenres = useGenres as jest.MockedFunction<typeof useGenres>;

// beforeAll(() => {
//     mockedUseAuthors.mockReturnValue({
//         authors: [
//             {
//                 _id: "1",
//                 name: "author1",
//             },
//             {
//                 _id: "2",
//                 name: "author2",
//             },
//         ],
//         error: "",
//         setAuthors: jest.fn(),
//         setError: jest.fn(),
//         isLoading: false,
//     });

//     mockedUseGenres.mockReturnValue({
//         genres: [
//             {
//                 _id: "1",
//                 name: "genre1",
//             },
//             {
//                 _id: "2",
//                 name: "genre2",
//             },
//         ],
//         error: "",
//         setGenres: jest.fn(),
//         setError: jest.fn(),
//         isLoading: false,
//     });
// });

// describe("AuthorGenreList", () => {
//     it("renders correctly", () => {
//         const tree = renderer.create(<AuthorGenreList />).toJSON();
//         expect(tree).toMatchSnapshot();
//     });

//     it("calls post method of HttpService when add button is clicked", async () => {
//         render(<AuthorGenreList />);
//         await act(async () => {
//             await fireEvent.change(
//                 screen.getByPlaceholderText(/enter new genre../i),
//                 {
//                     target: { value: "genre3" },
//                 }
//             );
//         });
//         fireEvent.click(screen.getByTestId("add-genre-button"));
//         expect(MockedHttpService).toHaveBeenCalledTimes(1);
//         expect(mockPost).toHaveBeenCalledWith({ name: "genre3" });
//     });

//     // it("calls onSelectAuthor when author is selected and display author name in menubutton", () => {
//     //     mockedUseAuthors.mockReturnValueOnce({
//     //         authors: [
//     //             {
//     //                 _id: "1",
//     //                 name: "author1",
//     //             },
//     //             {
//     //                 _id: "2",
//     //                 name: "author2",
//     //             },
//     //         ],
//     //         error: "",
//     //         setAuthors: jest.fn(),
//     //         setError: jest.fn(),
//     //         isLoading: false,
//     //     });

//     //     render(
//     //         <AuthorSelector
//     //             selectedAuthor={null}
//     //             onSelectAuthor={mockedOnSelectAuthor}
//     //         />
//     //     );

//     //     fireEvent.click(screen.getByText("author1"));
//     //     expect(mockedOnSelectAuthor).toHaveBeenCalledWith({
//     //         _id: "1",
//     //         name: "author1",
//     //     });
//     //     // expect(screen.getByTestId("author-menubutton")).toHaveTextContent(
//     //     //     /author1/i
//     //     // );
//     // });

//     // it("renders correctly with no cover image", () => {
//     //     render(
//     //         <BookCard
//     //             book={{
//     //                 _id: "123",
//     //                 title: "test",
//     //                 author: { _id: "1", name: "author1" },
//     //                 genre: { _id: "1", name: "genre1" },
//     //                 yearPublished: 2021,
//     //                 coverImage: "",
//     //                 rating: 5,
//     //                 description: "test",
//     //                 numberInStock: 1,
//     //             }}
//     //         />
//     //     );
//     //     expect(screen.getByRole("img").getAttribute("src")).toBe(
//     //         defaultBookCover
//     //     );
//     // });
// });
