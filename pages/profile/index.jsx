import Link from "next/link";
// import { format } from "date-fns";
import { Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { currency, formatMoney } from "lib";
import api from "utils/__api__/users";
// ============================================================
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { fetchUserData } from "../../src/redux/reducers/authentication";
import { getUserOrders } from "../../src/redux/reducers/order";
import userId from "utils/userId";
import { useRouter } from "next/router";

const Profile = () => {
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const router = useRouter();

  const user = useSelector((state) => state.authentication.userData);
  const userOrders = useSelector((state) => state.orders.orders);
  const orders = userOrders?.orders;
  const pending = orders?.filter((order) => order.status === "Pending");
  const processing = orders?.filter((order) => order.status === "Processing");
  const completed = orders?.filter((order) => order.status === "Delivered");
  const cancelled = orders?.filter((order) => order.status === "Cancelled");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    const id = userId();
    if (!id) router.push("/login");
    dispatch(fetchUserData(id))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
        dispatch(getUserOrders(id));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <Button
      color="primary"
      LinkComponent={Link}
      href={`/profile/${user?._id}`}
      sx={{
        px: 4,
        bgcolor: "primary.light",
      }}
    >
      Edit Profile
    </Button>
  );
  const infoList = [
    // {
    //   title: `${orders && orders.length}`,
    //   subtitle: "All Orders",
    // },
    {
      title: `${pending && pending.length}`,
      subtitle: "Pending orders",
    },
    {
      title: `${processing && processing.length}`,
      subtitle: "Processing orders",
    },
    {
      title: `${completed && completed.length}`,
      subtitle: "Completed orders",
    },
    {
      title: `${cancelled && cancelled.length}`,
      subtitle: "Cancelled orders",
    },
  ];
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={Person}
        title="My Profile"
        button={HEADER_LINK}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* USER PROFILE INFO */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                display: "flex",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >
              <Avatar
                src={`${user?.avatar}`}
                sx={{
                  height: 64,
                  width: 64,
                }}
              />

              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap">
                  <div>
                    <H5 my="0px">{`${user?.name?.firstName} ${user?.name?.lastName}`}</H5>
                    <FlexBox alignItems="center">
                      <Typography color="grey.600">Balance:</Typography>
                      <Typography ml={0.5} color="primary.main">
                        {formatMoney(500)} XAF
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography color="grey.600" letterSpacing="0.2em">
                    TEMZONE USER
                  </Typography>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      p: "1rem 1.25rem",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {item.title || 0}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow
        sx={{
          cursor: "auto",
          p: "0.75rem 1.5rem",
          ...(downMd && {
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "flex-start",
          }),
        }}
      >
        <TableRowItem title="First Name" value={user?.name?.firstName} />
        <TableRowItem title="Last Name" value={user?.name?.lastName} />
        <TableRowItem title="Email" value={user?.email} />
        <TableRowItem title="Phone" value={user?.phone} />
        {/* <TableRowItem
          title="Birth date"
          value={format(new Date(user?.dateOfBirth), "dd MMM, yyyy")}
        /> */}
      </TableRow>
    </CustomerDashboardLayout>
  );
};
const TableRowItem = ({ title, value }) => {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5} textAlign="left">
        {title}
      </Small>
      <span>{value}</span>
    </FlexBox>
  );
};
export const getStaticProps = async () => {
  const user = await api.getUser();
  return {
    props: {
      user,
    },
  };
};
export default Profile;
