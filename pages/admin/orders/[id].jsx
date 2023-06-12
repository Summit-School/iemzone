import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { H3 } from "components/Typography";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { OrderDetails } from "pages-sections/admin";
// import api from "utils/__api__/dashboard";
// =============================================================================
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getSingleOrder } from "../../../src/redux/reducers/order";

// =============================================================================
OrderEdit.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function OrderEdit() {
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const orderResponse = useSelector((state) => state.orders.order);
  const order = orderResponse?.order;

  useEffect(() => {
    dispatch(getSingleOrder(query.id))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          return enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [query.id]);

  if (!order) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box py={4}>
      <H3 mb={2}>Order Details</H3>
      <OrderDetails order={order} />
    </Box>
  );
}
