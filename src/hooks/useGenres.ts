import { Genre } from "../models/genre";
import useData from "./generic/useData";

const useGenres = () => {
    const {
        data: genres,
        setData: setGenres,
        error,
        setError,
        isLoading,
    } = useData<Genre>("/genres");
    return { genres, setGenres, error, setError, isLoading };
};

export default useGenres;
