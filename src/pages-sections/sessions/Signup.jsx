import { useCallback, useState } from "react";
import { Button, Checkbox, Box, FormControlLabel } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { Wrapper } from "./Login";
// import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { register } from "../../redux/reducers/authentication";

const Signup = () => {
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
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.number,
      password: values.password,
    };
    dispatch(register(data), setLoading(true))
      .then((res) => {
        console.log("response", res);
        if (res.meta.requestStatus === "fulfilled") {
          enqueueSnackbar(res.payload, {
            variant: "success",
          });
          setLoading(false);
          navigate.push("/");
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
          src="/assets/logo/temzone-black.png"
          height={35}
          sx={{
            m: "auto",
          }}
        />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Create Your Account
        </H1>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="firstName"
          size="small"
          label="Fist Name"
          variant="outlined"
          onBlur={handleBlur}
          value={values.firstName}
          onChange={handleChange}
          placeholder="Ralph"
          error={!!touched.firstName && !!errors.firstName}
          helperText={touched.firstName && errors.firstName}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="lastName"
          size="small"
          label="Last Name"
          variant="outlined"
          onBlur={handleBlur}
          value={values.lastName}
          onChange={handleChange}
          placeholder="Awards"
          error={!!touched.lastName && !!errors.lastName}
          helperText={touched.lastName && errors.lastName}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="number"
          size="small"
          type="number"
          variant="outlined"
          onBlur={handleBlur}
          value={values.number}
          onChange={handleChange}
          label="Phone Number"
          placeholder="+237 672 491 296"
          error={!!touched.number && !!errors.number}
          helperText={touched.number && errors.number}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email"
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Password"
          variant="outlined"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
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

        <BazaarTextField
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label="Retype Password"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <FormControlLabel
          name="agreement"
          className="agreement"
          onChange={handleChange}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={values.agreement || false}
            />
          }
          label={
            <FlexBox
              flexWrap="wrap"
              alignItems="center"
              justifyContent="flex-start"
            >
              By signing up, you agree to
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Terms & Condition
                </H6>
              </a>
            </FlexBox>
          }
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
          {loading ? "Loading..." : "Create Account"}
        </Button>
      </form>

      {/* <SocialButtons /> */}
      <FlexRowCenter mt="1.25rem">
        <Box>Already have an account?</Box>
        <Link href="/login">
          <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
            Login
          </H6>
        </Link>
      </FlexRowCenter>
    </Wrapper>
  );
};
const initialValues = {
  firstName: "",
  lastName: "",
  number: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};
const formSchema = yup.object().shape({
  firstName: yup.string().required("Frst name is required"),
  lastName: yup.string().required("Last name is required"),
  number: yup.string().required("Phone number is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});
export default Signup;
