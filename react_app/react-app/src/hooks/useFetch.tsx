import { useState, useEffect } from "react";


const useFetch = (url: string, options?: RequestInit) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect (() => {
        const fetchData = async () => {         //The function is run every time the depenedencies change
            setIsloading(true);
            setIsError(false);
            try {
                const response = await fetch(url, options);  //fetch data from the specified url 
                if (!response.ok){
                    throw new Error(response.statusText)
                    setIsError(true);
                }       //In case the response status is not 200-299
                const json = await response.json();
                setData(json);
                setIsloading(false);
            } catch (error) {    
                setIsError(true);
                setIsloading(false);
            }
        };
        fetchData();
    }, [url, options]);

    return { data, isLoading, isError };
};

export default useFetch;