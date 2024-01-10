const useGenres = jest.fn().mockReturnValue({
    genres: [
        { _id: "1", name: "genre1" },
        { _id: "2", name: "genre2" },
    ],
    setGenres: jest.fn(),
    error: "",
    setError: jest.fn(),
    isLoading: false,
});

export default useGenres;
