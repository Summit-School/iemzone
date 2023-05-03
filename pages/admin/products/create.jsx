import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";

// =============================================================================
CreateProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function CreateProduct() {
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
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    category: yup.array().min(1).required("required"),
    brand: yup.array().min(1).required("required"),
    description: yup.string().required("required"),
    stock: yup.number().required("required"),
    price: yup.number().required("required"),
    sale_price: yup.number().required("required"),
    size: yup.string().required("required"),
    discount: yup.string().required("required"),
  });

  return (
    <Box py={4}>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
      />
    </Box>
  );
}
