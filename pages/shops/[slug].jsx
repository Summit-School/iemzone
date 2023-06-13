import { useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Grid, IconButton, useMediaQuery } from "@mui/material";
import FilterList from "@mui/icons-material/FilterList";
import Sidenav from "components/Sidenav";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ShopIntroCard from "components/shop/ShopIntroCard";
import ProductList1 from "components/products/ProductList1";
import ProductFilterCard from "pages-sections/product-details/ProductFilterCard";
// import api from "utils/__api__/shop";

// ============================================================
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getShopDetails } from "../../src/redux/reducers/shop";
import { shopProducts } from "../../src/redux/reducers/admin/product";
// ============================================================

const ShopDetails = () => {
  const router = useRouter();
  const { query } = useRouter();
  const isDownMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const shopObject = useSelector((state) => state.shop.shop);
  const shop = shopObject?.shop;
  const singleShopProducts = useSelector((state) => state.products.products);
  const products = singleShopProducts?.products;

  useEffect(() => {
    dispatch(getShopDetails(query.slug))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          return enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
        dispatch(shopProducts(query.slug));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const ICON_BUTTON = (
    <IconButton
      sx={{
        float: "right",
      }}
    >
      <FilterList fontSize="small" />
    </IconButton>
  );
  return (
    <ShopLayout1>
      <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        {/* SHOP INTRODUCTION AREA */}
        <ShopIntroCard
          name={shop?.name}
          phone={shop?.phone}
          address={shop?.address}
          email={shop?.email}
          coverPicture={shop?.coverPicture}
          profilePicture={shop?.profilePicture}
          socialLinks={shop?.socialLinks}
        />

        <Grid container spacing={3}>
          {/* SIDEBAR AREA */}
          <Grid
            item
            md={3}
            xs={12}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <ProductFilterCard />
          </Grid>

          <Grid item md={9} xs={12}>
            {/* SMALL DEVICE SIDEBAR AREA */}
            {isDownMd && (
              <Sidenav position="left" handle={ICON_BUTTON}>
                <ProductFilterCard />
              </Sidenav>
            )}

            {/* PRODUCT LIST AREA */}
            <ProductList1 products={products?.slice(0, 9)} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>
  );
};
// export const getStaticPaths = async () => {
//   const paths = await api.getSlugs();
//   return {
//     paths: paths,
//     //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const shop = await api.getProductsBySlug(String(params.slug));
//   return {
//     props: {
//       shop,
//     },
//   };
// };
export default ShopDetails;
