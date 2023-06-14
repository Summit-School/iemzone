import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Box, Button, Divider, Grid, Radio, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "components/Card1";
// import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import { useAppContext } from "contexts/AppContext";
// ================================================================
import userId from "utils/userId";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { placeOrder } from "../../redux/reducers/order";
import { stripePayment } from "../../redux/reducers/stripe";
import { campayPayment } from "../../redux/reducers/campay";

const PaymentForm = () => {
  const { state } = useAppContext();
  const cartList = state.cart;
  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  const [paymentMethod, setPaymentMethod] = useState("mobile-money");
  const [phoneNumber, setPhoneNumber] = useState(237);
  const [loading, setLoading] = useState(false);
  const width = useWindowSize();
  const router = useRouter();
  const isMobile = width < 769;
  const id = userId();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const totalPrice = getTotalPrice();

  const handleFormSubmit = async () => {
    const shippingData = JSON.parse(
      localStorage.getItem("iemzone-shipping-data")
    );
    const data = {
      userId: id,
      paymentMethod,
      cartItems: cartList,
      shippingData,
      totalPrice,
    };
    if (cartList.length < 1) {
      return enqueueSnackbar("cart is empty", {
        variant: "error",
      });
    }
    if (paymentMethod === "cod") {
      return dispatch(placeOrder(data), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            enqueueSnackbar(res.payload, {
              variant: "success",
            });
            setLoading(false);
            router.push("/order-confirmation");
          }
          if (res.meta.requestStatus === "rejected") {
            enqueueSnackbar(res.payload, {
              variant: "error",
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const momoData = {
        amount: `${totalPrice}`,
        from: phoneNumber,
      };
      dispatch(campayPayment(momoData), setLoading(true))
        .then((res) => {
          console.log(res);
          if (res.payload.status === "SUCCESSFUL") {
            enqueueSnackbar("Processing...", {
              variant: "success",
            });
            dispatch(placeOrder(data)).then(() => {
              setLoading(false);
              router.push("/order-confirmation");
            });
          }
          if (res.payload.status === "FAILED") {
            enqueueSnackbar("Transaction Incomplete", {
              variant: "error",
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // dispatch(stripePayment(data), setLoading(true))
    //   .then((res) => {
    //     if (res.meta.requestStatus === "fulfilled") {
    //       enqueueSnackbar("Processing...", {
    //         variant: "success",
    //       });
    //       setLoading(false);
    //       window.location.href = res.payload.url;
    //     }
    //     if (res.meta.requestStatus === "rejected") {
    //       enqueueSnackbar(res.payload, {
    //         variant: "error",
    //       });
    //       setLoading(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Card1
        sx={{
          mb: 4,
        }}
      >
        <FormControlLabel
          sx={{
            mb: 3,
          }}
          name="mobile-money"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Mobile Money Payment</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "mobile-money"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        />

        {paymentMethod === "mobile-money" && (
          <form>
            <Box mb={3}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="phoneNumber"
                    label="Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                  />
                </Grid>
              </Grid>
            </Box>

            <Button
              onClick={handleFormSubmit}
              variant="contained"
              color="primary"
              sx={{
                mb: 4,
              }}
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>
            {loading ? (
              <Paragraph>
                Please make sure you have your phone with you to confirm this
                transaction. If you do not get any notification, dial *126# to
                view the transaction.
              </Paragraph>
            ) : (
              ""
            )}

            <Divider
              sx={{
                mb: 3,
                mx: -4,
              }}
            />
          </form>
        )}

        {/* <FormControlLabel
          sx={{
            mb: 3,
          }}
          name="credit-card"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Pay with credit card</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "credit-card"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        />

        {paymentMethod === "credit-card" && (
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Grid container spacing={3}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="card_no"
                        label="Card Number"
                        onBlur={handleBlur}
                        value={values.card_no}
                        onChange={handleChange}
                        helperText={touched.card_no && errors.card_no}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="exp_date"
                        label="Exp Date"
                        placeholder="MM/YY"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.exp_date}
                        helperText={touched.exp_date && errors.exp_date}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        label="Name on Card"
                        onChange={handleChange}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        label="Name on Card"
                        onChange={handleChange}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mb: 4,
                  }}
                >
                  Submit
                </Button>

                <Divider
                  sx={{
                    mb: 3,
                    mx: -4,
                  }}
                />
              </form>
            )}
          </Formik>
        )} */}

        {/* <FormControlLabel
          name="paypal"
          sx={{
            mb: 3,
          }}
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Pay with Paypal</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "paypal"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        />

        {paymentMethod === "paypal" && (
          <Fragment>
            <FlexBox alignItems="flex-end" mb={4}>
              <TextField
                fullWidth
                name="email"
                type="email"
                label="Paypal Email"
                sx={{
                  mr: isMobile ? "1rem" : "30px",
                }}
              />
              <Button variant="outlined" color="primary" type="button">
                Submit
              </Button>
            </FlexBox>

            <Divider
              sx={{
                mb: 3,
                mx: -4,
              }}
            />
          </Fragment>
        )} */}

        <FormControlLabel
          name="cod"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Cash On Delivery</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "cod"}
              color="primary"
              size="small"
            />
          }
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Button
            LinkComponent={Link}
            href="/checkout"
            variant="outlined"
            color="primary"
            type="button"
            fullWidth
          >
            Back to checkout details
          </Button>
        </Grid>

        <Grid item sm={6} xs={12}>
          {paymentMethod === "cod" ? (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleFormSubmit}
              fullWidth
            >
              {loading ? "Loading..." : "Place Order"}
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};
// const initialValues = {
//   phoneNumber: "",
//   name: "",
//   exp_date: "",
//   cvc: "",
//   shipping_zip: "",
//   shipping_country: "",
//   shipping_address1: "",
//   shipping_address2: "",
//   billing_name: "",
//   billing_email: "",
//   billing_contact: "",
//   billing_company: "",
//   billing_zip: "",
//   billing_country: "",
//   billing_address1: "",
//   billing_address2: "",
// };
// const checkoutSchema = yup.object().shape({
//   phoneNumber: yup.string().required("required"),
//   name: yup.string().required("required"),
//   exp_date: yup.string().required("required"),
//   cvc: yup.string().required("required"),
//   // shipping_zip: yup.string().required("required"),
//   // shipping_country: yup.object().required("required"),
//   // shipping_address1: yup.string().required("required"),
//   // billing_name: yup.string().required("required"),
//   // billing_email: yup.string().required("required"),
//   // billing_contact: yup.string().required("required"),
//   // billing_zip: yup.string().required("required"),
//   // billing_country: yup.string().required("required"),
//   // billing_address1: yup.string().required("required"),
// });

export default PaymentForm;
