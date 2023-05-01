import { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { CategoryUpdate } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// import api from "utils/__api__/products";

// =============================================================================
EditCategory.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { singleCategory } from "../../../redux/reducers/admin/category";
// =============================================================================

// form field validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("required"),
});
export default function EditCategory() {
  const { query } = useRouter();
  const [category, setCategory] = useState(null);
  const singleCat = useSelector((state) => state.categories.category);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleCategory(query?.id))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
        setCategory(res.payload.category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFormSubmit = () => {};
  return (
    <Box py={4}>
      <H3 mb={2}>Edit Category</H3>

      <CategoryUpdate
        initialValues={singleCat?.category}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
