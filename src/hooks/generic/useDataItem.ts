import { useEffect, useState } from "react";
import { CanceledError } from "../../services/api-client";
import HttpService, { Entity } from "../../services/http-service";

function useDataItem<T extends Entity>(
    dataService: HttpService<T>,
    id: string
) {
    const [data, setData] = useState<T>({} as T);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        const { request, cancel } = dataService.get(id);

        request
            .then((res) => {
                setData(res.data);
                setLoading(false);
                setError("");
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            })
            .finally(() => {
                // console.log("Loader hidden");
                // setLoading(false);
            });

        return () => cancel();
    }, []);

    return { data, setData, error, setError, isLoading };
}

export default useDataItem;
