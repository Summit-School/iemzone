import { isExpired, decodeToken } from "react-jwt";
import { useSnackbar } from "notistack";

const useId = () => {
      const { enqueueSnackbar } = useSnackbar();
  const userToken = localStorage.getItem("iemzone-user");
  const isTokenExpired = isExpired(userToken);
  if (isTokenExpired === true) {
    return enqueueSnackbar("Session Expired. Please login again.", {
            variant: "error",
          });
  }
  const decodedToken = decodeToken(userToken);
  const id = decodedToken.userId;

  return id;
};

export default useId;