import axios from "axios";

export const createAPI = () => {
  return axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true,
  });
};
