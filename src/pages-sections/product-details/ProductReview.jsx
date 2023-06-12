import { useState, useEffect } from "react";
import { Box, Button, TextField, Rating } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox } from "components/flex-box";
import ProductComment from "./ProductComment";
import { H2, H5, Paragraph } from "components/Typography";

// ===================================================
import userId from "utils/userId";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { fetchUserData } from "../../redux/reducers/authentication";
import { createReview } from "../../redux/reducers/admin/productReview";

// ===================================================

const ProductReview = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const id = userId();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const getReviews = useSelector((state) => state.productReviews.reviews);
  const reviews = getReviews?.reviews;

  const handleFormSubmit = async (values, { resetForm }) => {
    dispatch(fetchUserData(id), setLoading(true))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const user = res.payload.user;
          let data = {
            productId: product._id,
            firstName: user?.name.firstName,
            lastName: user?.name.lastName,
            imgUrl: user?.avatar,
            rating: values.rating,
            comment: values.comment,
          };
          dispatch(createReview(data))
            .then((res) => {
              if (res.meta.requestStatus === "fulfilled") {
                enqueueSnackbar(res.payload, {
                  variant: "success",
                });
                setLoading(false);
                resetForm();
              }
              if (res.meta.requestStatus === "rejected") {
                setLoading(false);
                enqueueSnackbar(res.payload, {
                  variant: "error",
                });
              }
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
    validationSchema: reviewSchema,
  });
  return (
    <Box>
      {reviews?.length > 0 ? (
        reviews?.map((item, ind) => <ProductComment {...item} key={ind} />)
      ) : (
        <Paragraph color="grey.700">No Reviews Found</Paragraph>
      )}

      <H2 fontWeight="600" mt={7} mb={2.5}>
        Write a Review for this product
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb={2.5}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Your Rating</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            color="warn"
            size="medium"
            value={values.rating}
            onChange={(_, value) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Your Review</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextField
            rows={8}
            multiline
            fullWidth
            name="comment"
            variant="outlined"
            onBlur={handleBlur}
            value={values.comment}
            onChange={handleChange}
            placeholder="Write a review here..."
            error={!!touched.comment && !!errors.comment}
            helperText={touched.comment && errors.comment}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!(dirty && isValid)}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
};
// const commentList = [
//   {
//     name: "Jannie Schumm",
//     imgUrl: "/assets/images/faces/7.png",
//     rating: 4.7,
//     date: "2021-02-14",
//     comment:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
//   },
//   {
//     name: "Joe Kenan",
//     imgUrl: "/assets/images/faces/6.png",
//     rating: 4.7,
//     date: "2019-08-10",
//     comment:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
//   },
//   {
//     name: "Jenifer Tulio",
//     imgUrl: "/assets/images/faces/8.png",
//     rating: 4.7,
//     date: "2021-02-05",
//     comment:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
//   },
// ];
const initialValues = {
  rating: 0,
  comment: "",
  date: new Date().toISOString(),
};
const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  comment: yup.string().required("required"),
});
export default ProductReview;
