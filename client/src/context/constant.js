export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://obscure-brook-56796.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "token-mern";
