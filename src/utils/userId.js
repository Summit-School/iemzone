import { isExpired, decodeToken } from "react-jwt";
// import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

//  const { enqueueSnackbar } = useSnackbar();

const useId = () => {
  // const navigate = useRouter();
  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("iemzone-user")
      : false;
  const isTokenExpired = isExpired(userToken);
  if (isTokenExpired === true) {
    // return enqueueSnackbar("Session Expired. Please login again.", {
    //         variant: "error",
    //       });
    // navigate.push("/");
    return typeof window !== "undefined"? window.alert("Session Expired. Please login again"): false
  }
  const decodedToken = decodeToken(userToken);
  const id = decodedToken.userId;

  return id;
};

export default useId;


