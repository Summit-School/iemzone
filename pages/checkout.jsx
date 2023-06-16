import { useEffect } from "react";
import { Grid } from "@mui/material";
import SEO from "components/SEO";
import CheckoutForm from "pages-sections/checkout/CheckoutForm";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import CheckoutSummary from "pages-sections/checkout/CheckoutSummary";
import userId from "utils/userId";
import { useRouter } from "next/router";

const Checkout = () => {
  const router = useRouter();

  useEffect(() => {
    const id = userId();
    if (!id) {
      // window.location.href = "/";
      router.push("/");
    }
  }, []);

  return (
    <CheckoutNavLayout>
      <SEO title="Checkout" />
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary />
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

export default Checkout;
