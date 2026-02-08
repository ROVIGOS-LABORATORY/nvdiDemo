import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../enums/API";

const client = axios.create({
  baseURL: API.BASE_URL,
  timeout: 10000, // 10 seconds timeout
  // withCredentials: true,
});

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const request = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => response.data;
  const onError = async (error: AxiosError) => {
    console.error(error.response?.data || error.message);
    const data = {
      ...(error.response?.data ?? {}),
      status: error.response?.status,
    };
    return Promise.reject(data);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
