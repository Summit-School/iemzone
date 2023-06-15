import Link from "next/link";
import LazyImage from "components/LazyImage";
import { Container, Grid } from "@mui/material";
const Section8 = ({ img1, img2, md1, md2 }) => {
  return (
    <Container
      sx={{
        mb: "70px",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={md1}>
          <Link href="/">
            <LazyImage width={385} height={342} alt="banner" src={img1} />
          </Link>
        </Grid>

        <Grid item xs={12} md={md2}>
          <Link href="/">
            <LazyImage width={590} height={342} alt="banner" src={img2} />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Section8;
