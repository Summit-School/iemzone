import { isExpired, decodeToken } from "react-jwt";

const useId = () => {
  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("iemzone-user")
      : false;
  if (userToken) {
    const isTokenExpired = isExpired(userToken);
    if (isTokenExpired === true) {
      return typeof window !== "undefined"
        ? window.alert("Session Expired. Please login to continue")
        : false;
    }
    const decodedToken = decodeToken(userToken);
    const id = decodedToken.userId;

    return id;
  }
  return typeof window !== "undefined"
    ? window.alert("Please login to continue")
    : false;
};

export default useId;
