import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Avatar, Box, Button, Divider, TextField } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H5, Span } from "components/Typography";
import CustomerService from "components/icons/CustomerService";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/ticket";
// ==========================================================
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getSingleTicket, sendTicketMsg } from "redux/reducers/supportTicket";
import { fetchUserData } from "redux/reducers/authentication";
import userID from "utils/userId";

const SupportTicketDetails = () => {
  const userId = userID();
  const router = useRouter();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const ticket = useSelector((state) => state.supportTicket.ticket);

  useEffect(() => {
    const data = {
      ticketId: query.slug,
    };
    dispatch(getSingleTicket(data))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          return enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
        dispatch(fetchUserData(userId))
          .then((res) => {
            setUser(res.payload.user);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [query.slug]);

  // HANDLE FORM SUBMIT
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      ticketId: query.slug,
      message: newMessage,
      sender: userId,
      date: Date.now(),
    };
    if (newMessage !== "") {
      dispatch(sendTicketMsg(data), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            enqueueSnackbar("Message sent", {
              variant: "success",
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return enqueueSnackbar("Message required", {
        variant: "error",
      });
    }
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <Button
      color="primary"
      LinkComponent={Link}
      href="/support-tickets"
      sx={{
        px: 4,
        bgcolor: "primary.light",
      }}
    >
      Back to Support Ticket
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
        button={HEADER_LINK}
        icon={CustomerService}
        title="Support Ticket"
        navigation={<CustomerDashboardNavigation />}
      />

      <FlexBox gap={2} mb={4}>
        <H5 fontWeight="600" mt={0} mb={0}>
          Subject: {ticket && ticket.subject}
        </H5>
      </FlexBox>

      {/* CONVERSATION LIST */}
      {ticket &&
        user &&
        ticket.message.map((item, ind) => (
          <FlexBox gap={2} mb={4} key={ind}>
            {user._id === item.sender ? (
              <Avatar src={user.avatar} />
            ) : (
              <Avatar src={`/assets/logo/icon.png`} />
            )}

            <Box>
              <H5 fontWeight="600" mt={0} mb={0}>
                {user._id === item.sender ? user.name.firstName : "Temzone"}
              </H5>

              <Span color="grey.600">
                {format(new Date(item.date), "hh:mm:a | dd MMM yyyy")}
              </Span>

              <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
                {item.message}
              </Box>
            </Box>
          </FlexBox>
        ))}

      <Divider
        sx={{
          mb: 4,
          borderColor: "grey.300",
        }}
      />

      {/* FORM AREA */}
      <form onSubmit={handleFormSubmit}>
        <TextField
          rows={8}
          fullWidth
          multiline
          sx={{
            mb: 3,
          }}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write your message here..."
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            ml: "auto",
            display: "block",
          }}
        >
          {loading ? "Loading..." : "Post message"}
        </Button>
      </form>
    </CustomerDashboardLayout>
  );
};
// export const getStaticPaths = async () => {
//   const paths = await api.getSlugs();
//   return {
//     paths: paths,
//     //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const ticket = await api.getTicket(String(params.slug));
//   return {
//     props: {
//       ticket,
//     },
//   };
// };
export default SupportTicketDetails;
