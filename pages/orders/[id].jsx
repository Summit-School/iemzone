import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Done, ShoppingBag } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import TableRow from "components/TableRow";
import Delivery from "components/icons/Delivery";
import PackageBox from "components/icons/PackageBox";
import TruckFilled from "components/icons/TruckFilled";
import { H5, H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import useWindowSize from "hooks/useWindowSize";
import { currency } from "lib";
// import api from "utils/__api__/orders";
// =============================================================================
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getSingleOrder } from "../../src/redux/reducers/order";

// styled components
const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4,
    },
  },
}));
// =============================================================

const OrderDetails = () => {
  const router = useRouter();
  const { query } = useRouter();
  const width = useWindowSize();
  const orderStatus = "Shipping";
  const orderStatusList = ["Packaging", "Shipping", "Delivering", "Complete"];
  const stepIconList = [PackageBox, TruckFilled, Delivery];
  const breakpoint = 350;
  const statusIndex = orderStatusList.indexOf(orderStatus);

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

  // SECTION TITLE HEADER
  const HEADER_BUTTON = (
    <Button
      LinkComponent={Link}
      href="/sale=page-1"
      color="primary"
      sx={{
        bgcolor: "primary.light",
        px: 4,
      }}
    >
      Order Again
    </Button>
  );

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={ShoppingBag}
        title="Order Details"
        navigation={<CustomerDashboardNavigation />}
        button={HEADER_BUTTON}
      />

      {/* ORDER PROGRESS AREA */}
      <Card
        sx={{
          p: "2rem 1.5rem",
          mb: "30px",
        }}
      >
        <StyledFlexbox>
          {stepIconList.map((Icon, ind) => (
            <Fragment key={ind}>
              <Box position="relative">
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: ind <= statusIndex ? "primary.main" : "grey.300",
                    color: ind <= statusIndex ? "grey.white" : "primary.main",
                  }}
                >
                  <Icon
                    color="inherit"
                    sx={{
                      fontSize: "32px",
                    }}
                  />
                </Avatar>

                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor: "grey.200",
                        color: "success.main",
                      }}
                    >
                      <Done
                        color="inherit"
                        sx={{
                          fontSize: "1rem",
                        }}
                      />
                    </Avatar>
                  </Box>
                )}
              </Box>

              {ind < stepIconList.length - 1 && (
                <Box
                  className="line"
                  bgcolor={ind < statusIndex ? "primary.main" : "grey.300"}
                />
              )}
            </Fragment>
          ))}
        </StyledFlexbox>

        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            textAlign="center"
            borderRadius="300px"
            color="primary.main"
            bgcolor="primary.light"
          >
            Estimated Delivery Period <b>7 Days</b>
          </Typography>
        </FlexBox>
      </Card>

      {/* ORDERED PRODUCT LIST */}
      <Card
        sx={{
          p: 0,
          mb: "30px",
        }}
      >
        <TableRow
          sx={{
            p: "12px",
            borderRadius: 0,
            boxShadow: "none",
            bgcolor: "grey.200",
          }}
        >
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Order ID:
            </Typography>

            <Typography fontSize={14}>{order?._id}</Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Placed on:
            </Typography>

            <Typography fontSize={14}>
              {order && format(new Date(order?.createdAt), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Delivered on:
            </Typography>

            <Typography fontSize={14}>
              {format(new Date(), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py={1}>
          {order?.items.map((item, ind) => (
            <FlexBox
              px={2}
              py={1}
              flexWrap="wrap"
              alignItems="center"
              key={ind}
            >
              <FlexBox flex="2 2 260px" m={0.75} alignItems="center">
                <Avatar
                  src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${item.imgUrl}`}
                  sx={{
                    height: 64,
                    width: 64,
                  }}
                />
                <Box ml={2.5}>
                  <H6 my="0px">{item.name}</H6>

                  <Typography fontSize="14px" color="grey.600">
                    {currency(item.price)} x {item.qty}
                  </Typography>
                </Box>
              </FlexBox>

              <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                <Typography fontSize="14px" color="grey.600">
                  {order?.status}
                </Typography>
              </FlexBox>

              <FlexBox flex="160px" m={0.75} alignItems="center">
                <Button variant="text" color="primary">
                  <Typography fontSize="14px">Write a Review</Typography>
                </Button>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      {/* SHIPPING AND ORDER SUMMERY */}
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Shipping Address
            </H5>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Name
              </Typography>

              <Paragraph fontSize={14} my={0}>
                {order?.shippingData.shipping_name}
              </Paragraph>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Email
              </Typography>

              <Paragraph fontSize={14} my={0}>
                {order?.shippingData.shipping_email}
              </Paragraph>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Contact
              </Typography>

              <Paragraph fontSize={14} my={0}>
                {order?.shippingData.shipping_contact}
              </Paragraph>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Company
              </Typography>

              <Paragraph fontSize={14} my={0}>
                {order?.shippingData.shipping_company}
              </Paragraph>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                City
              </Typography>

              <Paragraph fontSize={14} my={0}>
                {order?.shippingData.shipping_city.label}
              </Paragraph>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Address one
              </Typography>

              <Paragraph fontSize={14} my={0}>
                {order?.shippingData.shipping_address1}
              </Paragraph>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Address two
              </Typography>

              <Paragraph fontSize={14} my={0}>
                {order?.shippingData.shipping_address2}
              </Paragraph>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Zip Code
              </Typography>

              <Paragraph fontSize={14} my={0}>
                {order?.shippingData.shipping_zip}
              </Paragraph>
            </FlexBetween>
          </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          {order && order.shippingData.same_as_shipping ? (
            <Card
              sx={{
                p: "20px 30px",
              }}
            >
              <H5 mt={0} mb={2}>
                Billing Address
              </H5>

              <Paragraph fontSize={14} my={0}>
                Billing information is thesame as shipping information.
              </Paragraph>
            </Card>
          ) : (
            <Card
              sx={{
                p: "20px 30px",
              }}
            >
              <H5 mt={0} mb={2}>
                Billing Address
              </H5>

              <FlexBetween mb={1}>
                <Typography fontSize={14} color="grey.600">
                  Name
                </Typography>

                <Paragraph fontSize={14} my={0}>
                  {order?.shippingData.billing_name}
                </Paragraph>
              </FlexBetween>

              <FlexBetween mb={1}>
                <Typography fontSize={14} color="grey.600">
                  Email
                </Typography>

                <Paragraph fontSize={14} my={0}>
                  {order?.shippingData.billing_email}
                </Paragraph>
              </FlexBetween>

              <FlexBetween mb={1}>
                <Typography fontSize={14} color="grey.600">
                  Contact
                </Typography>

                <Paragraph fontSize={14} my={0}>
                  {order?.shippingData.billing_contact}
                </Paragraph>
              </FlexBetween>

              <FlexBetween mb={1}>
                <Typography fontSize={14} color="grey.600">
                  Company
                </Typography>

                <Paragraph fontSize={14} my={0}>
                  {order?.shippingData.billing_company}
                </Paragraph>
              </FlexBetween>

              <FlexBetween mb={1}>
                <Typography fontSize={14} color="grey.600">
                  City
                </Typography>

                <Paragraph fontSize={14} my={0}>
                  {order?.shippingData.billing_city.label}
                </Paragraph>
              </FlexBetween>

              <FlexBetween mb={1}>
                <Typography fontSize={14} color="grey.600">
                  Address one
                </Typography>

                <Paragraph fontSize={14} my={0}>
                  {order?.shippingData.billing_address1}
                </Paragraph>
              </FlexBetween>

              <FlexBetween mb={1}>
                <Typography fontSize={14} color="grey.600">
                  Address two
                </Typography>

                <Paragraph fontSize={14} my={0}>
                  {order?.shippingData.billing_address2}
                </Paragraph>
              </FlexBetween>

              <FlexBetween mb={1}>
                <Typography fontSize={14} color="grey.600">
                  Zip Code
                </Typography>

                <Paragraph fontSize={14} my={0}>
                  {order?.shippingData.billing_zip}
                </Paragraph>
              </FlexBetween>
            </Card>
          )}
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Total Summary
            </H5>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Subtotal:
              </Typography>

              <H6 my="0px">{currency(order?.totalPrice)}</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Shipping fee:
              </Typography>

              <H6 my="0px">{currency(1000)}</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Discount:
              </Typography>

              <H6 my="0px">{currency(order?.discount)}</H6>
            </FlexBetween>

            <Divider
              sx={{
                mb: 1,
              }}
            />

            <FlexBetween mb={2}>
              <H6 my="0px">Total</H6>
              <H6 my="0px">{currency(order?.totalPrice)}</H6>
            </FlexBetween>

            <FlexBetween mb={2}>
              <H6 my="0px">Payment Method</H6>

              <Typography fontSize={14}>
                {order?.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Credit/Debit Card"}
              </Typography>
            </FlexBetween>
          </Card>
        </Grid>
      </Grid>
    </CustomerDashboardLayout>
  );
};
export const getStaticPaths = async () => {
  const paths = await api.getIds();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

// export const getStaticProps = async ({ params }) => {
//   const order = await api.getOrder(String(params.id));
//   return {
//     props: {
//       order,
//     },
//   };
// };
export default OrderDetails;
