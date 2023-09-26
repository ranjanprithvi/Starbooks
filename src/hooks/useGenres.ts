import genreService, { Genre } from "../services/genre-service";
import useData from "./useData";

const useGenres = () => {
    const {
        data: genres,
        setData: setGenres,
        error,
        setError,
        isLoading,
    } = useData<Genre>(genreService);
    return { genres, setGenres, error, setError, isLoading };
};

export default useGenres;
