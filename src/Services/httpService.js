import axios from "axios";

axios.defaults.baseURL = "https://fakestoreapi.com";

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    error.isExpectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
