import Link from "next/link";
import { Box, Container, Grid } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import RankBadge from "components/icons/RankBadge";
import DottedStar from "components/icons/DottedStar";
import ProductCard4 from "components/product-cards/ProductCard4";
import ProductCard5 from "components/product-cards/ProductCard5";
import CategorySectionHeader from "components/CategorySectionHeader";
// =================================================================

const Section4 = ({ topRatedBrands, topRatedList }) => {
  return (
    <Box mb={7.5}>
      <Container>
        <Grid container spacing={4}>
          {/* TOP RATINGS AREA */}
          <Grid item lg={6} xs={12}>
            <CategorySectionHeader
              icon={<RankBadge />}
              title="Top Ratings"
              seeMoreLink="#"
            />

            <BazaarCard
              sx={{
                p: 2,
              }}
            >
              <Grid container spacing={4}>
                {topRatedList?.map((item) => (
                  <Grid item md={3} sm={6} xs={6} key={item._id}>
                    <Link href={`/product/${item._id}`}>
                      <ProductCard4
                        title={item.title}
                        regularPrice={item.regularPrice}
                        salesPrice={item.salesPrice}
                        rating={item.rating}
                        imgUrl={item.thumbnail}
                        reviewCount={item.reviews.length}
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </BazaarCard>
          </Grid>

          {/* FEATURED BRANDS AREA */}
          <Grid item lg={6} xs={12}>
            <CategorySectionHeader
              icon={<DottedStar />}
              title="Featured Brands"
              seeMoreLink="#"
            />

            <BazaarCard
              sx={{
                p: 2,
              }}
            >
              <Grid container spacing={3}>
                {topRatedBrands &&
                  topRatedBrands?.map(({ _id, name, image, slug }) => (
                    <Grid item sm={6} xs={12} key={_id}>
                      <Link href={`/product/search/${slug}`}>
                        <ProductCard5 title={name} imgUrl={image} />
                      </Link>
                    </Grid>
                  ))}
              </Grid>
            </BazaarCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Section4;
