import Link from "next/link";
import {
  Box,
  Chip,
  IconButton,
  Pagination,
  styled,
  Button,
  Typography,
} from "@mui/material";
import { East } from "@mui/icons-material";
import { format } from "date-fns";
import TableRow from "components/TableRow";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import CustomerService from "components/icons/CustomerService";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/ticket";
// #####################################################################
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "redux/reducers/supportTicket";
import userID from "utils/userId";

// styled components
const StyledChip = styled(Chip)(({ theme, green }) => ({
  height: 26,
  margin: "6px",
  padding: " 0 0.25rem",
  color: green ? theme.palette.success.main : theme.palette.primary.main,
  backgroundColor: green
    ? theme.palette.success[100]
    : theme.palette.primary.light,
}));

// SECTION TITLE HEADER LINK
const HEADER_LINK = (
  <Button
    color="primary"
    LinkComponent={Link}
    href="/support-tickets/create-ticket"
    sx={{
      px: 4,
      bgcolor: "primary.light",
    }}
  >
    Create New Ticket
  </Button>
);

const TicketList = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = userID();

  const tickets = useSelector((state) => state.supportTicket.tickets);

  useEffect(() => {
    const data = {
      userId,
    };
    dispatch(getAllTickets(data), setLoading(true))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setLoading(false);
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
        button={HEADER_LINK}
        title="Support Ticket"
        icon={CustomerService}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* SUPPORT TICKET LIST AREA */}
      {tickets.length > 0 ? (
        tickets.map((item) => (
          <Link href={`/support-tickets/${item._id}`} key={item._id}>
            <TableRow
              sx={{
                my: "1rem",
                p: "15px 24px",
              }}
            >
              <Box>
                <span>{item.subject}</span>
                <FlexBox alignItems="center" flexWrap="wrap" pt={1} m={-0.75}>
                  <StyledChip label={item.priority} size="small" />
                  <StyledChip label={item.status} size="small" green={1} />

                  <Span className="pre" m={0.75} color="grey.600">
                    {format(new Date(item.createdAt), "MMM dd, yyyy")}
                  </Span>

                  <Span m={0.75} color="grey.600">
                    {item.subject}
                  </Span>
                </FlexBox>
              </Box>

              <Typography
                flex="0 0 0 !important"
                textAlign="center"
                color="grey.600"
              >
                <IconButton>
                  <East
                    fontSize="small"
                    color="inherit"
                    sx={{
                      transform: ({ direction }) =>
                        `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
                    }}
                  />
                </IconButton>
              </Typography>
            </TableRow>
          </Link>
        ))
      ) : (
        <Span className="pre" m={0.75} color="grey.600">
          No tickets found
        </Span>
      )}

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          count={tickets.length || 0}
          color="primary"
          variant="outlined"
          onChange={(data) => console.log(data)}
        />
      </FlexBox>
    </CustomerDashboardLayout>
  );
};
// export const getStaticProps = async () => {
//   const ticketList = await api.getTicketList();
//   return {
//     props: {
//       ticketList,
//     },
//   };
// };
export default TicketList;
