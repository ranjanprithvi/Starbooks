export const mockPost = jest.fn();
export const mockPatch = jest.fn();
export const mockDelete = jest.fn();
export const mockGet = jest.fn();
export const mockGetAll = jest.fn();

const MockedHttpService = jest.fn().mockImplementation(() => {
    return {
        post: mockPost,
        patch: mockPatch,
        delete: mockDelete,
        get: mockGet,
        getAll: mockGetAll,
    };
});

export default MockedHttpService;
