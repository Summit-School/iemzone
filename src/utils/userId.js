import { isExpired, decodeToken } from "react-jwt";

const userId = () => {
  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("temzone-user")
      : false;
  if (userToken) {
    const isTokenExpired = isExpired(userToken);
    if (isTokenExpired === true) {
      typeof window !== "undefined"
        ? window.alert("Session Expired. Please login to continue")
        : false;
      window.location.href = "/login";
      return;
    }
    const decodedToken = decodeToken(userToken);
    const id = decodedToken.userId;

    return id;
  }
  return typeof window !== "undefined"
    ? window.alert("Please login to continue")
    : false;
};

export default userId;
