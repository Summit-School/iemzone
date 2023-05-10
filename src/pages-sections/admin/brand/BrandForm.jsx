import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import { UploadImageBox, StyledClear } from "../StyledComponents";

// ================================================================
import userId from "utils/userId";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { createBrand } from "../../../../redux/reducers/admin/brand";

// ================================================================

const BrandForm = (props) => {
  const { initialValues, validationSchema } = props;
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = userId();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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
      const image = files[0];
      const brandSlug = values.name.replace(/\W+/g, "-").toLowerCase();
      let form = new FormData();
      form.append("userId", id);
      form.append("name", values.name);
      form.append("slug", brandSlug);
      form.append("image", image);
      form.append("featured", values.featured);

      dispatch(createBrand(form), setLoading(true))
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
        onSubmit={handleFormSubmit}
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
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

              <Grid item xs={12}>
                <DropZone
                  title="Drop & drag category image"
                  onChange={(files) => handleChangeDropZone(files)}
                />

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
                <FormControlLabel
                  label="Featured Brand"
                  control={
                    <Checkbox
                      color="info"
                      name="featured"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.featured}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  {loading ? "Loading..." : "Save Brand"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};
export default BrandForm;
