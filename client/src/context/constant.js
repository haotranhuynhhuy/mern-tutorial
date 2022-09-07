export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://lit-tundra-13416.herokuapp.com/api"
    : "";

export const LOCAL_STORAGE_TOKEN_NAME = "token-mern";
