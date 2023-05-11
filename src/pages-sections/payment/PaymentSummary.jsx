import { Divider } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { currency } from "lib";
import { useAppContext } from "contexts/AppContext";

const PaymentSummary = () => {
  const { state } = useAppContext();
  const cartList = state.cart;
  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);

  const shippingFee = 1000;
  const totalPrice = getTotalPrice() + shippingFee;

  return (
    <Card1>
      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(getTotalPrice())}
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Shipping:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(shippingFee)}
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Tax:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(0)}
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={2}>
        <Paragraph color="grey.600">Discount:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(0)}
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
        {currency(totalPrice)}
      </Paragraph>
    </Card1>
  );
};
export default PaymentSummary;
