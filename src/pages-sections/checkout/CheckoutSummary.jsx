import { Button, Divider, TextField, Typography } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { currency, formatMoney } from "lib";
import { useAppContext } from "contexts/AppContext";
import { getShippingFee } from "redux/reducers/shipping";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const CheckoutSummary = () => {
  const { state } = useAppContext();
  const dispatch = useDispatch();

  const cartList = state.cart;
  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);

  const shippingFee = useSelector((state) => state.shipping.shippingFee);
  const fee = shippingFee && shippingFee[0].shippingFee;
  const tax = 0;
  const discount = 0;

  useEffect(() => {
    dispatch(getShippingFee());
  }, []);

  const totalPrice = getTotalPrice() + fee + tax + discount;

  return (
    <Card1>
      <FlexBetween mb={1}>
        <Typography color="grey.600">Subtotal:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {formatMoney(getTotalPrice())} XAF
        </Typography>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Typography color="grey.600">Shipping:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {formatMoney(fee)} XAF
        </Typography>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Typography color="grey.600">Tax:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {formatMoney(tax)} XAF
        </Typography>
      </FlexBetween>

      <FlexBetween mb={2}>
        <Typography color="grey.600">Discount:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {formatMoney(discount)} XAF
        </Typography>
      </FlexBetween>

      <Divider
        sx={{
          mb: "1rem",
        }}
      />

      <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
        mb={3}
      >
        {formatMoney(totalPrice)} XAF
      </Typography>

      <TextField
        placeholder="Voucher"
        variant="outlined"
        size="small"
        fullWidth
      />
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{
          mt: "1rem",
          mb: "30px",
        }}
      >
        Apply Voucher
      </Button>
    </Card1>
  );
};
export default CheckoutSummary;
