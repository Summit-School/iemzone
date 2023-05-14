import { useState } from "react";
import { Delete, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Button,
  Avatar,
  Divider,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { currency } from "lib";
// ===================================================================
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { updateOrderStatus } from "../../../../redux/reducers/order";

// ===================================================================

const OrderDetails = ({ order }) => {
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const updateStatusHandler = (e) => {
    e.preventDefault();
    let data = {
      orderId: order._id,
      status: orderStatus,
    };
    if (orderStatus === "") {
      return enqueueSnackbar("No change made", {
        variant: "error",
      });
    }
    dispatch(updateOrderStatus(data), setLoading(true))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          enqueueSnackbar(res.payload, {
            variant: "success",
          });
          setLoading(false);
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
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card
          sx={{
            p: 3,
          }}
        >
          <FlexBox alignItems="center" gap={4}>
            <Paragraph>
              <Span color="grey.600">Order ID:</Span> {order?._id}
            </Paragraph>

            <Paragraph>
              <Span color="grey.600">Placed on:</Span>{" "}
              {format(new Date(order?.createdAt), "dd MMM, yyyy")}
            </Paragraph>
          </FlexBox>

          <FlexBox
            gap={3}
            my={3}
            flexDirection={{
              sm: "row",
              xs: "column",
            }}
          >
            <TextField
              fullWidth
              color="info"
              size="medium"
              variant="outlined"
              value={order?.paymentStatus}
              label="Payment Status"
              placeholder="Payment Status"
            />

            <TextField
              select
              fullWidth
              color="info"
              size="medium"
              defaultValue={order?.status}
              onChange={(e) => setOrderStatus(e.target.value)}
              label="Order Status"
              inputProps={{
                IconComponent: () => (
                  <KeyboardArrowDown
                    sx={{
                      color: "grey.600",
                      mr: 1,
                    }}
                  />
                ),
              }}
            >
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
          </FlexBox>

          {order?.items.map((item, index) => (
            <Box
              my={2}
              gap={2}
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  md: "1fr 1fr",
                  xs: "1fr",
                },
              }}
            >
              <FlexBox flexShrink={0} gap={1.5} alignItems="center">
                <Avatar
                  src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${item.imgUrl}`}
                  sx={{
                    height: 64,
                    width: 64,
                    borderRadius: "8px",
                  }}
                />

                <Box>
                  <H6 mb={1}>{item.name}</H6>

                  <FlexBox alignItems="center" gap={1}>
                    <Paragraph fontSize={14} color="grey.600">
                      {currency(item.price)} x
                    </Paragraph>

                    <Box maxWidth={60}>
                      <TextField value={item.qty} type="number" fullWidth />
                    </Box>
                  </FlexBox>
                </Box>
              </FlexBox>

              <FlexBetween flexShrink={0}>
                <Paragraph color="grey.600">{item.slug}</Paragraph>

                {/* <IconButton>
                  <Delete
                    sx={{
                      color: "grey.600",
                      fontSize: 22,
                    }}
                  />
                </IconButton> */}
              </FlexBetween>
            </Box>
          ))}
        </Card>
      </Grid>

      <Grid item md={6} xs={12}>
        <Card
          sx={{
            px: 3,
            py: 4,
          }}
        >
          {/* <TextField
            rows={5}
            multiline
            fullWidth
            color="info"
            variant="outlined"
            label="Shipping Address"
            defaultValue={order?.shippingAddress}
            sx={{
              mb: 4,
            }}
          /> 
          
           <TextField
            rows={5}
            multiline
            fullWidth
            color="info"
            variant="outlined"
            label="Customer’s Note"
            defaultValue="Please deliver ASAP."
          />*/}
          <H5 mb={1}>Shipping Details</H5>
          <FlexBetween>
            <Paragraph color="grey.700">Name:</Paragraph>
            <b>{order?.shippingData.shipping_name}</b>
          </FlexBetween>
          <FlexBetween>
            <Paragraph color="grey.700">Email:</Paragraph>
            <b>{order?.shippingData.shipping_email}</b>
          </FlexBetween>
          <FlexBetween>
            <Paragraph color="grey.700">Contact:</Paragraph>
            <b>{order?.shippingData.shipping_contact}</b>
          </FlexBetween>
          <FlexBetween>
            <Paragraph color="grey.700">City:</Paragraph>
            <b>{order?.shippingData.shipping_city.label}</b>
          </FlexBetween>
          <FlexBetween>
            <Paragraph color="grey.700">Company:</Paragraph>
            <b>{order?.shippingData.shipping_company}</b>
          </FlexBetween>
          <FlexBetween>
            <Paragraph color="grey.700">Address one:</Paragraph>
            <b>{order?.shippingData.shipping_address1}</b>
          </FlexBetween>
          <FlexBetween>
            <Paragraph color="grey.700">Address two:</Paragraph>
            <b>{order?.shippingData.shipping_address2}</b>
          </FlexBetween>
          <FlexBetween>
            <Paragraph color="grey.700">Zip Code:</Paragraph>
            <b>{order?.shippingData.shipping_zip}</b>
          </FlexBetween>
        </Card>
      </Grid>

      <Grid item md={6} xs={12}>
        {order?.shippingData.same_as_shipping === true ? (
          <Card
            sx={{
              px: 3,
              py: 4,
            }}
          >
            <H5 mb={1}>Billing Details</H5>
            <Paragraph color="grey.700">Same As Shipping Details</Paragraph>
          </Card>
        ) : (
          <Card
            sx={{
              px: 3,
              py: 4,
            }}
          >
            <H5 mb={1}>Billing Details</H5>
            <FlexBetween>
              <Paragraph color="grey.700">Name:</Paragraph>
              <b>{order?.shippingData.billing_name}</b>
            </FlexBetween>
            <FlexBetween>
              <Paragraph color="grey.700">Email:</Paragraph>
              <b>{order?.shippingData.billing_email}</b>
            </FlexBetween>
            <FlexBetween>
              <Paragraph color="grey.700">Contact:</Paragraph>
              <b>{order?.shippingData.billing_contact}</b>
            </FlexBetween>
            <FlexBetween>
              <Paragraph color="grey.700">City:</Paragraph>
              <b>{order?.shippingData.billing_city.label}</b>
            </FlexBetween>
            <FlexBetween>
              <Paragraph color="grey.700">Company:</Paragraph>
              <b>{order?.shippingData.billing_company}</b>
            </FlexBetween>
            <FlexBetween>
              <Paragraph color="grey.700">Address one:</Paragraph>
              <b>{order?.shippingData.billing_address1}</b>
            </FlexBetween>
            <FlexBetween>
              <Paragraph color="grey.700">Address two:</Paragraph>
              <b>{order?.shippingData.billing_address2}</b>
            </FlexBetween>
            <FlexBetween>
              <Paragraph color="grey.700">Zip Code:</Paragraph>
              <b>{order?.shippingData.billing_zip}</b>
            </FlexBetween>
          </Card>
        )}
      </Grid>

      <Grid item md={6} xs={12}>
        <Card
          sx={{
            px: 3,
            py: 4,
          }}
        >
          <H5 mt={0} mb={2}>
            Total Summary
          </H5>

          <FlexBetween mb={1.5}>
            <Paragraph color="grey.600">Subtotal:</Paragraph>
            <H6>{currency(order.totalPrice)}</H6>
          </FlexBetween>

          <FlexBetween mb={1.5}>
            <Paragraph color="grey.600">Shipping fee:</Paragraph>

            <FlexBox alignItems="center" gap={1} maxWidth={100}>
              <Paragraph>1000 XAF</Paragraph>
              {/* <TextField
                color="info"
                defaultValue={10}
                type="number"
                fullWidth
              /> */}
            </FlexBox>
          </FlexBetween>

          <FlexBetween mb={1.5}>
            <Paragraph color="grey.600">Discount(%):</Paragraph>

            <FlexBox alignItems="center" gap={1} maxWidth={100}>
              <Paragraph>{order?.discount}</Paragraph>
              {/* <TextField
                color="info"
                defaultValue={order.discount}
                type="number"
                fullWidth
              /> */}
            </FlexBox>
          </FlexBetween>

          <Divider
            sx={{
              my: 2,
            }}
          />

          <FlexBetween mb={2}>
            <H6>Total</H6>
            <H6>{currency(order?.totalPrice)}</H6>
          </FlexBetween>

          <Paragraph>
            {order?.paymentMethod === "cod" ? (
              <Paragraph>Cash on Delivery Payment</Paragraph>
            ) : (
              <Paragraph>Credit/Debit Card Payment</Paragraph>
            )}
          </Paragraph>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="info"
          onClick={(e) => updateStatusHandler(e)}
        >
          {loading ? "Loading..." : "Update Status"}
        </Button>
      </Grid>
    </Grid>
  );
};
export default OrderDetails;
