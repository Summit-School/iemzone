import Link from "next/link";
import {
  Chip,
  Pagination,
  styled,
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { FlexBox } from "components/flex-box";
import CustomerService from "components/icons/CustomerService";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/ticket";
// ################################################################
import { useState, useEffect } from "react";
import { createTicket } from "redux/reducers/supportTicket";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
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

// =============================================

// =============================================

const CreateTicket = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [priorityState, setPriorityState] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = () => {
    if (subject && priorityState && message) {
      const userId = userID();
      const data = {
        userId,
        subject,
        message,
        priority: priorityState,
        sender: userId,
        date: Date.now(),
      };
      dispatch(createTicket(data), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            enqueueSnackbar("Ticket Created", {
              variant: "success",
            });
            setLoading(false);
            navigate.push("/support-tickets");
          }
          if (res.meta.requestStatus === "rejected") {
            setLoading(false);
            enqueueSnackbar("Failed", {
              variant: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      enqueueSnackbar("All fields are required", {
        variant: "error",
      });
    }
  };

  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        title="Create New Ticket"
        icon={CustomerService}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* CREATE SUPPORT TICKET AREA */}
      <Formik>
        {({ handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="subject"
                  label="Subject *"
                  color="info"
                  size="medium"
                  placeholder="Subject"
                  onBlur={handleBlur}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="priority"
                  onBlur={handleBlur}
                  placeholder="Priority"
                  onChange={(e) => setPriorityState(e.target.value)}
                  label="Select Priority *"
                >
                  {priority.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item sm={12} xs={12}>
                <TextField
                  rows={8}
                  fullWidth
                  multiline
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFormSubmit}
                >
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          count={5}
          color="primary"
          variant="outlined"
          onChange={(data) => console.log(data)}
        />
      </FlexBox>
    </CustomerDashboardLayout>
  );
};

const priority = ["Normal", "High", "Urgent"];
export default CreateTicket;
