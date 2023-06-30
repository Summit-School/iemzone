import { useEffect, useState } from "react";
import Link from "next/link";
import SEO from "components/SEO";
import { Box, Button, Card, TextField } from "@mui/material";
import { H1, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
// ===========================================================
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { newPassword } from "redux/reducers/authentication";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const token =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : false;

  useEffect(() => {
    const isTokenExpired = isExpired(token);
    if (token !== "undefined") {
      if (isTokenExpired === true) {
        typeof window !== "undefined"
          ? window.alert(
              "Link Expired. Please enter email to create a new link."
            )
          : false;
        router.push("/reset-password");
        return;
      }
      const decodedToken = decodeToken(token);
      const id = decodedToken.userId;
      setUserId(id);
      return;
    }
  }, []);

  const handleNewPassword = () => {
    if (newPassword) {
      const data = {
        userId,
        newPassword: password,
      };
      dispatch(newPassword(data), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            enqueueSnackbar(res.payload, {
              variant: "success",
            });
            setLoading(false);
            router.push("/");
          }
          if (res.meta.requestStatus === "rejected") {
            setLoading(false);
            enqueueSnackbar(res.payload, {
              variant: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      return enqueueSnackbar("Password is required", {
        variant: "error",
      });
    }
  };

  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Reset Password" />

      <Card
        sx={{
          padding: 4,
          maxWidth: 600,
          marginTop: 4,
          boxShadow: 1,
        }}
      >
        <H1 fontSize={20} fontWeight={700} mb={4} textAlign="center">
          New password
        </H1>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form
            style={{
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              name="password"
              type="password"
              label="New Password"
              // onBlur={handleBlur}
              // value={values.email}
              onChange={(e) => setPassword(e.target.value)}
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
            />

            <Box
              sx={{
                mt: 2,
              }}
            >
              <Button
                fullWidth
                onClick={handleNewPassword}
                color="primary"
                variant="contained"
              >
                {loading ? "Loading..." : "Update"}
              </Button>
            </Box>
          </form>

          <FlexRowCenter mt="1.25rem" justifyContent="center" width="100%">
            <Box>Don&apos;t have account?</Box>
            <Link href="/signup">
              <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                Sign Up
              </H6>
            </Link>
          </FlexRowCenter>
        </FlexBox>
      </Card>
    </FlexRowCenter>
  );
};
export default NewPassword;
