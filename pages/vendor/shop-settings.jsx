import { useState } from "react";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import { H3, Paragraph } from "components/Typography";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// ####################################################################
import userId from "../../src/utils/userId";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { createShop } from "../../redux/reducers/shop";

const INITIAL_VALUES = {
  shopName: "",
  shopSlug: "",
  shopPhone: "",
  shopEmail: "",
  shopAddress: "",
  shopFacebookLink: "",
  shopTwitterLink: "",
  shopYoutubeLink: "",
  shopInstagramLink: "",
};
const validationSchema = Yup.object().shape({
  shopName: Yup.string().required("Shop Name is required!"),
  shopSlug: Yup.string().required("Shop Slug is required!"),
  shopEmail: Yup.string().required("Shop Email is required!"),
  shopPhone: Yup.string().required("Shop Phone is required!"),
  shopAddress: Yup.string().required("Shop Address is required!"),
});

// =============================================================================
ShopSettings.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function ShopSettings() {
  // const [links, setLinks] = useState([
  //   {
  //     id: 1,
  //     name: "Links",
  //     value: "https://www.productbanner.com",
  //   },
  // ]);
  // const handleAddLink = () => {
  //   const newLink = {
  //     id: Date.now(),
  //     name: "Links",
  //     value: "https://www.google.com",
  //   };
  //   setLinks((state) => [...state, newLink]);
  // };
  // const handleDeleteLink = (id) => () => {
  //   setLinks((state) => state.filter((item) => item.id !== id));
  // };
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const id = userId();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = (values) => {
    let data = {
      userId: id,
      name: values.shopName,
      slug: values.shopSlug,
      phone: values.shopPhone,
      email: values.shopEmail,
      address: values.shopAddress,
      facebook: values.shopFacebookLink,
      twitter: values.shopTwitterLink,
      youtube: values.shopYoutubeLink,
      instagram: values.shopInstagramLink,
      profilePicture: profilePicture,
      coverPicture: coverPicture,
    };
    dispatch(createShop(data), setLoading(true))
      .then((res) => {
        console.log("response", res);
        if (res.meta.requestStatus === "fulfilled") {
          enqueueSnackbar(res.payload, {
            variant: "success",
          });
          setLoading(false);
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
  };

  return (
    <Box py={4} maxWidth={740} margin="auto">
      <H3 mb={2}>Shop Settings</H3>

      <Card
        sx={{
          p: 3,
        }}
      >
        <Paragraph fontWeight={700} mb={4}>
          Basic Settings
        </Paragraph>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3} mb={3}>
                <TextField
                  color="info"
                  size="medium"
                  name="shopName"
                  label="Shop Name *"
                  onBlur={handleBlur}
                  value={values.shopName}
                  onChange={handleChange}
                  error={Boolean(errors.shopName && touched.shopName)}
                  helperText={touched.shopName && errors.shopName}
                />

                <TextField
                  color="info"
                  size="medium"
                  name="shopSlug"
                  label="Slug *"
                  onBlur={handleBlur}
                  value={values.shopSlug}
                  onChange={handleChange}
                  error={Boolean(errors.shopSlug && touched.shopSlug)}
                  helperText={touched.shopSlug && errors.shopSlug}
                />

                <TextField
                  color="info"
                  size="medium"
                  name="shopPhone"
                  label="Shop Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shopPhone}
                  error={Boolean(errors.shopPhone && touched.shopPhone)}
                  helperText={touched.shopPhone && errors.shopPhone}
                />

                <TextField
                  color="info"
                  size="medium"
                  name="shopEmail"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shopEmail}
                  error={Boolean(errors.shopEmail && touched.shopEmail)}
                  helperText={touched.shopEmail && errors.shopEmail}
                />

                <TextField
                  color="info"
                  size="medium"
                  name="shopAddress"
                  label="Shop Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shopAddress}
                  error={Boolean(errors.shopAddress && touched.shopAddress)}
                  helperText={touched.shopAddress && errors.shopAddress}
                />

                {/* <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="category"
                  onBlur={handleBlur}
                  placeholder="Category"
                  label="Select Category"
                  onChange={handleChange}
                  value={values.category}
                  error={Boolean(errors.category && touched.category)}
                  helperText={touched.category && errors.category}
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                </TextField> */}

                {/* <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  label="Description (optional)"
                  error={Boolean(errors.description && touched.description)}
                  helperText={touched.description && errors.description}
                /> */}

                {/* <TextField
                  name="order"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.order}
                  label="Minimum Order *"
                  onChange={handleChange}
                  error={Boolean(errors.order && touched.order)}
                  helperText={touched.order && errors.order}
                /> */}
              </Stack>

              {/* <Button type="submit" color="info" variant="contained">
                Save Changes
              </Button> */}

              <Divider
                sx={{
                  my: 4,
                }}
              />

              <Paragraph fontWeight={700} mb={2}>
                Shop Page Settings
              </Paragraph>

              <Stack spacing={3} mb={3}>
                <DropZone
                  onChange={(files) => setProfilePicture(files)}
                  title="Shop profile picture (360 x 360) *"
                  imageSize="We had to limit height to maintian consistancy. Some device both side of the banner might cropped for height limitation."
                />
                <Paragraph fontWeight={700}>
                  {profilePicture && profilePicture[0].name}
                </Paragraph>

                <DropZone
                  onChange={(files) => setCoverPicture(files)}
                  title="Shop page banner * (Recommended size 1025x120)"
                  imageSize="We had
                   to limit height to maintian consistancy. Some device both side of the banner might cropped for height limitation."
                />
                <Paragraph fontWeight={700}>
                  {coverPicture && coverPicture[0].name}
                </Paragraph>

                {/* <TextField
            select
            fullWidth
            color="info"
            size="medium"
            name="features"
            placeholder="Product Features"
            label="Product Features"
            defaultValue="electronics"
          >
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem>
          </TextField> */}
              </Stack>

              {/* <Box mb={4}>
          {links.map((item) => (
            <FlexBox gap={2} alignItems="center" mb={2} key={item.id}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                label="Links"
                defaultValue={item.value}
              />

              <Box flexShrink={0}>
                <IconButton onClick={handleDeleteLink(item.id)}>
                  <Delete
                    sx={{
                      color: "grey.600",
                    }}
                  />
                </IconButton>
              </Box>
            </FlexBox>
          ))}

          <Button color="info" variant="outlined" onClick={handleAddLink}>
            Add Link
          </Button>
        </Box> */}

              <Divider
                sx={{
                  my: 4,
                }}
              />

              <Paragraph fontWeight={700} mb={2}>
                Social Links
              </Paragraph>

              <Paragraph fontWeight={700} mb={4}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  label="Facebook"
                  defaultValue={values.shopFacebookLink}
                  placeholder="https://www.facebook.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Paragraph>
              <Paragraph fontWeight={700} mb={4}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  label="Twitter"
                  defaultValue={values.shopTwitterLink}
                  placeholder="https://www.twitter.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Paragraph>
              <Paragraph fontWeight={700} mb={4}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  label="Youtube"
                  defaultValue={values.shopYoutubeLink}
                  placeholder="https://www.youtube.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Paragraph>
              <Paragraph fontWeight={700} mb={4}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  label="Instagram"
                  defaultValue={values.shopInstagramLink}
                  placeholder="https://www.instagram.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Paragraph>

              <Button
                color="info"
                variant="contained"
                type="submit"
                onClick={handleFormSubmit}
              >
                {loading ? "Loading..." : "Save Changes"}
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}
