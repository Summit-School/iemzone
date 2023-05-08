import { useState, useEffect } from "react";
import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import { UploadImageBox, StyledClear } from "../StyledComponents";

// ================================================================
import userId from "utils/userId";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getShop } from "../../../../redux/reducers/shop";
import { createProduct } from "../../../../redux/reducers/admin/product";
import { userCategories } from "../../../../redux/reducers/admin/category";
import { userBrands } from "../../../../redux/reducers/admin/brand";

// ================================================================

const ProductForm = (props) => {
  const { initialValues, validationSchema } = props;
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const id = userId();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const shop = useSelector((state) => state.shop.shop);
  const shopId = shop?.shop._id;
  const userCats = useSelector((state) => state.categories.categories);
  const categories = userCats?.categories;
  const userBrds = useSelector((state) => state.brands.brands);
  const brands = userBrds?.brands;

  useEffect(() => {
    dispatch(userBrands(id))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    dispatch(userCategories(id))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    dispatch(getShop(id))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (files) => {
    files.forEach((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(files);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    if (files.length === 0) {
      return enqueueSnackbar("Image is required", {
        variant: "error",
      });
    } else {
      // const thumbnail = files[0];
      const productSlug = values.name.replace(/\W+/g, "-").toLowerCase();
      const form = new FormData();
      form.append("userId", id);
      form.append("shopId", shopId);
      form.append("title", values.name);
      form.append("slug", productSlug);
      form.append("brand", values.brand);
      form.append("categories", values.category);
      form.append("regularPrice", values.price);
      form.append("salesPrice", values.sale_price);
      form.append("size", values.size);
      form.append("stock", values.stock);
      form.append("colors", values.colors);
      form.append("discount", values.discount);
      form.append("description", values.description);
      // form.append("thumbnail", thumbnail);
      for (let i = 0; i < files.length; i++) {
        form.append("images", files[i]);
      }

      dispatch(createProduct(form), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            enqueueSnackbar(res.payload, {
              variant: "success",
            });
            setLoading(false);
            resetForm();
            setFiles([]);
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
  };

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };

  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Formik
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, { resetForm });
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name *"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                {brands ? (
                  <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="brand"
                    onBlur={handleBlur}
                    placeholder="Brand"
                    onChange={handleChange}
                    value={values.brand}
                    label="Select Brand *"
                    // SelectProps={{
                    //   multiple: true,
                    // }}
                    error={!!touched.brand && !!errors.brand}
                    helperText={touched.brand && errors.brand}
                  >
                    {brands?.map((brand) => (
                      <MenuItem value={brand.name} key={brand._id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  "No Brands Found"
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                {categories ? (
                  <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="category"
                    onBlur={handleBlur}
                    placeholder="Category"
                    onChange={handleChange}
                    value={values.category}
                    label="Select Category *"
                    // SelectProps={{
                    //   multiple: true,
                    // }}
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                  >
                    {categories?.map((category) => (
                      <MenuItem value={category.name} key={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  "No categories Found"
                )}
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="stock"
                  color="info"
                  size="medium"
                  label="Stock *"
                  placeholder="Stock"
                  onBlur={handleBlur}
                  value={values.stock}
                  onChange={handleChange}
                  error={!!touched.stock && !!errors.stock}
                  helperText={touched.stock && errors.stock}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="size"
                  label="Size *"
                  color="info"
                  size="medium"
                  placeholder="Size"
                  onBlur={handleBlur}
                  value={values.size}
                  onChange={handleChange}
                  error={!!touched.size && !!errors.size}
                  helperText={touched.size && errors.size}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="colors"
                  label="Colors"
                  color="info"
                  size="medium"
                  placeholder="Enter colors, separated by comma"
                  onBlur={handleBlur}
                  value={values.colors}
                  onChange={handleChange}
                  error={!!touched.colors && !!errors.colors}
                  helperText={touched.colors && errors.colors}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.price}
                  label="Regular Price *"
                  onChange={handleChange}
                  placeholder="Regular Price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  name="sale_price"
                  label="Sale Price *"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Sale Price"
                  value={values.sale_price}
                  error={!!touched.sale_price && !!errors.sale_price}
                  helperText={touched.sale_price && errors.sale_price}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  name="discount"
                  label="Discount *"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Discount(%)"
                  value={values.discount}
                  error={!!touched.discount && !!errors.discount}
                  helperText={touched.discount && errors.discount}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="description"
                  label="Description *"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Description"
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </Grid>

              <Grid item xs={12}>
                <DropZone onChange={(files) => handleChangeDropZone(files)} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  {loading ? "Loading..." : "Save product"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};
export default ProductForm;
