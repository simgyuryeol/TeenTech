import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.baseURL = "";

const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (params: AxiosRequestConfig) => {
    await axios
      .request(params)
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { response, error, loading };
};

export default useAxios;
