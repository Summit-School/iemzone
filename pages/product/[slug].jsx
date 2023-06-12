import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "pages-sections/product-details/ProductIntro";
import ProductReview from "pages-sections/product-details/ProductReview";
import AvailableShops from "pages-sections/product-details/AvailableShops";
import RelatedProducts from "pages-sections/product-details/RelatedProducts";
// import FrequentlyBought from "pages-sections/product-details/FrequentlyBought";
import ProductDescription from "pages-sections/product-details/ProductDescription";
import {
  // getFrequentlyBought,
  getRelatedProducts,
} from "utils/__api__/related-products";
import api from "utils/__api__/products";
// =============================================================================
import { useDispatch, useSelector } from "react-redux";
import { singleProduct } from "../../src/redux/reducers/admin/product";
import { getProductReviews } from "../../src/redux/reducers/admin/productReview";
import { getShop } from "../../src/redux/reducers/shop";
import userId from "utils/userId";
// =============================================================================

// styled component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

const ProductDetails = (props) => {
  const { frequentlyBought, relatedProducts } = props;
  const router = useRouter();
  const { query } = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value) => setSelectedOption(value);

  const dispatch = useDispatch();

  const getProduct = useSelector((state) => state.products.product);
  const product = getProduct?.product;

  useEffect(() => {
    const id = userId();
    dispatch(singleProduct(query.slug))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          return enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
        const prodId = res.payload.product._id;
        dispatch(getProductReviews(prodId))
          .then((res) => {
            if (res.meta.requestStatus === "rejected") {
              return enqueueSnackbar(res.payload, {
                variant: "error",
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
        dispatch(getShop(id))
          .then((res) => {
            if (res.meta.requestStatus === "rejected") {
              return enqueueSnackbar(res.payload, {
                variant: "error",
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [query.slug]);

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <ShopLayout1>
      <Container
        sx={{
          my: 4,
        }}
      >
        {/* PRODUCT DETAILS INFO AREA */}
        {product ? <ProductIntro product={product} /> : <H2>Loading...</H2>}

        {/* PRODUCT DESCRIPTION AND REVIEW */}
        <StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab className="inner-tab" label="Description" />
          <Tab className="inner-tab" label="Review(s)" />
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && (
            <ProductDescription description={product?.description} />
          )}
          {selectedOption === 1 && <ProductReview product={product} />}
        </Box>

        {/* {frequentlyBought && (
          <FrequentlyBought productsData={frequentlyBought} />
        )} */}

        <AvailableShops />

        {relatedProducts && <RelatedProducts productsData={relatedProducts} />}
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

export const getStaticProps = async ({ params }) => {
  const relatedProducts = await getRelatedProducts();
  // const frequentlyBought = await getFrequentlyBought();
  // const product = await api.getProduct(params.slug);
  return {
    props: {
      // frequentlyBought,
      relatedProducts,
      // product,
    },
  };
};
export default ProductDetails;
