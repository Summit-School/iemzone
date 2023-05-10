import { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { UpdateProduct } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// import api from "utils/__api__/products";
// =============================================================================
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { singleProduct } from "../../../redux/reducers/admin/product";

// =============================================================================
EditProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

const INITIAL_VALUES = {
  name: "",
  size: "",
  stock: "",
  price: "",
  category: [],
  brand: [],
  sale_price: "",
  description: "",
  colors: "",
  discount: "",
};

// form field validation schema
const validationSchema = yup.object().shape({
  title: yup.string().required("required"),
  categories: yup.array().min(1).required("required"),
  brand: yup.array().min(1).required("required"),
  description: yup.string().required("required"),
  stock: yup.number().required("required"),
  regularPrice: yup.number().required("required"),
  salesPrice: yup.number().required("required"),
  size: yup.string().required("required"),
  discount: yup.string().required("required"),
});

export default function EditProduct() {
  const { query } = useRouter();
  // const [product, setProduct] = useState({
  //   ...INITIAL_VALUES,
  // });

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const productResponse = useSelector((state) => state.products.product);
  const product = productResponse?.product;

  useEffect(() => {
    const prodId = query.slug;
    dispatch(singleProduct(prodId))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          return enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box py={4}>
      <H3 mb={2}>Edit Product</H3>

      <UpdateProduct
        initialValues={product}
        validationSchema={validationSchema}
      />
    </Box>
  );
}
