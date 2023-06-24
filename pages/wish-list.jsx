import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Favorite } from "@mui/icons-material";
import { Button, Grid, Pagination } from "@mui/material";
import SEO from "components/SEO";
import { useSnackbar } from "notistack";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import ProductCard1 from "components/product-cards/ProductCard1";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
// import productDatabase from "data/product-database";
// ==================================================================
import { useDispatch, useSelector } from "react-redux";
import userId from "utils/userId";
import { getWishlist } from "redux/reducers/authentication";

const WishList = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const allProducts = useSelector((state) => state.authentication.wishlist);
  const products = allProducts?.wishlist;
  const dispatch = useDispatch();
  const userID = userId();

  useEffect(() => {
    dispatch(getWishlist(userID))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // HANDLE CHANGE PAGINATION
  const handleChangePage = (page) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };

  // SECTION HEADER TITLE LINK
  const HEADER_BUTTON = (
    <Button
      color="primary"
      sx={{
        px: 4,
        bgcolor: "primary.light",
      }}
    >
      Add All to Cart
    </Button>
  );
  return (
    <CustomerDashboardLayout>
      <SEO title="Wishlist" />

      {/* TOP HEADER AREA */}
      <UserDashboardHeader
        icon={Favorite}
        title="My Wish List"
        button={HEADER_BUTTON}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((item) => (
            <Grid item lg={4} sm={6} xs={12} key={item.id}>
              <ProductCard1
                id={item.id}
                slug={item.slug}
                title={item.name}
                regularPrice={item.regularPrice}
                salesPrice={item.salesPrice}
                rating={item.rating}
                imgUrl={item.imgUrl}
                discount={item.discount}
                isFavoriteBtn={true}
              />
            </Grid>
          ))
        ) : (
          <Paragraph color="grey.800" mt="0.3rem" ml="3rem">
            No Product Found
          </Paragraph>
        )}
      </Grid>

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          color="primary"
          variant="outlined"
          page={currentPage}
          count={Math.ceil(products?.length / 6) || 0}
          onChange={(_, page) => handleChangePage(page)}
        />
      </FlexBox>
    </CustomerDashboardLayout>
  );
};
// export const getServerSideProps = async (context) => {
//   const products = productDatabase.slice(0, 30);
//   const PAGE_SIZE = 6;
//   const PAGE_NUMBER = context.query.page ? Number(context.query.page) : 1;
//   const currentProducts = products.slice(
//     (PAGE_NUMBER - 1) * PAGE_SIZE,
//     PAGE_NUMBER * PAGE_SIZE
//   );
//   return {
//     props: {
//       products: currentProducts,
//       totalProducts: products.length,
//     },
//   };
// };
export default WishList;
