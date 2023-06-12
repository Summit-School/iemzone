import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import OrderRow from "pages-sections/orders/OrderRow";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/orders";

// ====================================================
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getUserOrders } from "../../src/redux/reducers/order";
import userId from "utils/userId";

// ====================================================

const Orders = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const userOrders = useSelector((state) => state.orders.orders);
  const orders = userOrders?.orders;

  useEffect(() => {
    const id = userId();
    dispatch(getUserOrders(id))
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
  }, []);

  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        title="My Orders"
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* ORDER LIST AREA */}
      <TableRow
        elevation={0}
        sx={{
          padding: "0px 18px",
          background: "none",
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Order #
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Status
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Date purchased
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Total
        </H5>

        <H5
          my={0}
          px={2.75}
          color="grey.600"
          flex="0 0 0 !important"
          display={{
            xs: "none",
            md: "block",
          }}
        />
      </TableRow>

      {orders?.map((order) => (
        <OrderRow order={order} key={order._id} />
      ))}

      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          count={orders?.length}
          color="primary"
          variant="outlined"
          onChange={(data) => console.log(data)}
        />
      </FlexBox>
    </CustomerDashboardLayout>
  );
};
// export const getStaticProps = async () => {
//   const orderList = await api.getOrders();
//   return {
//     props: {
//       orderList,
//     },
//   };
// };
export default Orders;
