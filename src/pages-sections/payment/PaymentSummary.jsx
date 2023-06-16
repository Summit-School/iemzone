import { Divider } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { currency, formatMoney } from "lib";
import { useAppContext } from "contexts/AppContext";
import { getShippingFee } from "redux/reducers/shipping";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PaymentSummary = () => {
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
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {formatMoney(getTotalPrice())} XAF
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Shipping:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {formatMoney(fee)} XAF
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Tax:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {formatMoney(tax)} XAF
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={2}>
        <Paragraph color="grey.600">Discount:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {formatMoney(discount)} XAF
        </Paragraph>
      </FlexBetween>

      <Divider
        sx={{
          mb: 2,
        }}
      />

      <Paragraph
        fontSize={25}
        fontWeight={600}
        lineHeight={1}
        textAlign="right"
      >
        {formatMoney(totalPrice)} XAF
      </Paragraph>
    </Card1>
  );
};
export default PaymentSummary;
