import { Fragment } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
// ========================================================

const ProductList1 = ({ products }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products?.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item._id}>
            <ProductCard1
              id={item._id}
              slug={item.slug}
              title={item.title}
              regularPrice={item.regularPrice}
              salesPrice={item.salesPrice}
              rating={item.rating}
              imgUrl={item.thumbnail}
              discount={item.discount}
              description={item.description}
              category={item.categories}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of {products?.length} Products</Span>
        <Pagination
          count={Math.ceil(products?.length / 9)}
          variant="outlined"
          color="primary"
        />
      </FlexBetween>
    </Fragment>
  );
};
export default ProductList1;
