import axios from "axios";

const BASE_URL = "https://imprim-server.onrender.com"
// const BASE_URL = "http://localhost:7000"


export const login = ({ email, passwords }) => {
  axios
    .post(`${BASE_URL}/api/auth/login`, { email, passwords })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("token", JSON.stringify(token));
      window.location = "/admin";
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const logout = () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    window.location = "/";
  }
};
