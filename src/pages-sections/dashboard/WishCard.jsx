import NextImage from "next/image";
import { Box, Card } from "@mui/material";
import { H3, H5, Paragraph } from "components/Typography";
import { currency } from "lib";
// ####################################################
import { useDispatch, useSelector } from "react-redux";

const WishCard = () => {
  const user = useSelector((state) => state.authentication.userData);
  const username = user && user.name;

  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <H5 color="info.main" mb={0.5}>
        Hello, {username?.firstName}!
      </H5>
      <Paragraph color="grey.600">
        Here’s what happening with your store today!
      </Paragraph>

      <H3 mt={3}>15,350.25</H3>
      <Paragraph color="grey.600">Today’s Visit</Paragraph>

      <H3 mt={1.5}>{currency(10360.66)}</H3>
      <Paragraph color="grey.600">Today’s total sales</Paragraph>

      <Box
        sx={{
          right: 24,
          bottom: 0,
          position: "absolute",
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <NextImage
          src="/assets/images/illustrations/dashboard/welcome.svg"
          width={195}
          height={171}
          alt="Welcome"
        />
      </Box>
    </Card>
  );
};
export default WishCard;
