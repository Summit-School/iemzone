import { useCallback, useState } from "react";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
// import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { login } from "../../../redux/reducers/authentication";

const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};

export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle,
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const dispatch = useDispatch();
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async () => {
    let data = {
      phone: values.phone,
      password: values.password,
    };
    dispatch(login(data), setLoading(true))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          enqueueSnackbar(res.payload, {
            variant: "success",
          });
          setLoading(false);
          navigate.push("/profile");
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
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <BazaarImage
          src="/assets/images/bazaar-black-sm.svg"
          sx={{
            m: "auto",
          }}
        />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Welcome To Bazaar
        </H1>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="phone"
          size="small"
          type="number"
          variant="outlined"
          onBlur={handleBlur}
          value={values.phone}
          onChange={handleChange}
          label="Phone Number"
          placeholder="+237672491296"
          error={!!touched.phone && !!errors.phone}
          helperText={touched.phone && errors.phone}
        />

        <BazaarTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            height: 44,
          }}
          onClick={handleFormSubmit}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>

      {/* <SocialButtons /> */}

      <FlexRowCenter mt="1.25rem">
        <Box>Don&apos;t have account?</Box>
        <Link href="/signup">
          <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
            Sign Up
          </H6>
        </Link>
      </FlexRowCenter>

      <FlexBox
        justifyContent="center"
        bgcolor="grey.200"
        borderRadius="4px"
        py={2.5}
        mt="1.25rem"
      >
        Forgot your password?
        <Link href="/reset-password">
          <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
            Reset It
          </H6>
        </Link>
      </FlexBox>
    </Wrapper>
  );
};
const initialValues = {
  phone: "",
  password: "",
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  phone: yup.string().required("Phone number is required"),
});
export default Login;
