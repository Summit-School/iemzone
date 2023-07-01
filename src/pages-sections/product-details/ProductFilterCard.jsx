import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Rating,
  TextField,
} from "@mui/material";
import Accordion from "components/accordion/Accordion";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/AccordionHeader";
// ============================================================================
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { allCategories } from "redux/reducers/admin/category";
import { userBrands } from "redux/reducers/admin/brand";
import userID from "utils/userId";

const ProductFilterCard = ({
  categoryFilter,
  brandFilter,
  ratingFilter,
  colorFilter,
  priceFilter,
}) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const userId = userID();

  const categories = useSelector((state) => state.categories.categories);
  const userBrandList = useSelector((state) => state.brands.brands);
  const brandList = userBrandList?.brands;

  useEffect(() => {
    dispatch(allCategories());
    dispatch(userBrands(userId));
  }, []);

  const priceFilterMin = (value) => {
    const min = value;
    priceFilter(min, maxPrice);
  };
  const priceFilterMax = (value) => {
    const max = value;
    priceFilter(minPrice, max);
  };

  return (
    <Card
      sx={{
        p: "18px 27px",
        overflow: "auto",
      }}
      elevation={1}
    >
      {/* CATEGORY VARIANT FILTER */}
      <H6 mb={1.25}>Categories</H6>

      {categories.slice(0, 10).map((item) =>
        item.subCategories ? (
          <Accordion key={item.title} expanded>
            <AccordionHeader px={0} py={0.75} color="grey.600">
              <Span
                sx={{
                  cursor: "pointer",
                  mr: "9px",
                }}
              >
                {item.title}
              </Span>
            </AccordionHeader>

            {item.subCategories.map((name) => (
              <Paragraph
                pl="22px"
                py={0.75}
                key={name}
                fontSize="14px"
                color="grey.600"
                sx={{
                  cursor: "pointer",
                }}
              >
                {name}
              </Paragraph>
            ))}
          </Accordion>
        ) : (
          <Paragraph
            py={0.75}
            fontSize="14px"
            color="grey.600"
            key={item.name}
            className="cursor-pointer"
            sx={{
              cursor: "pointer",
            }}
            onClick={() => categoryFilter(item.name)}
          >
            {item.name}
          </Paragraph>
        )
      )}

      <Divider
        sx={{
          mt: 2,
          mb: 3,
        }}
      />

      {/* PRICE VARIANT FILTER */}
      <H6 mb={2}>Price Range</H6>
      <FlexBetween>
        <TextField
          placeholder="0"
          type="number"
          size="small"
          fullWidth
          onChange={(e) => (
            priceFilterMin(e.target.value), setMinPrice(e.target.value)
          )}
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          placeholder="250"
          type="number"
          size="small"
          fullWidth
          onChange={(e) => (
            priceFilterMax(e.target.value), setMaxPrice(e.target.value)
          )}
        />
      </FlexBetween>

      <Divider
        sx={{
          my: 3,
        }}
      />

      {/* BRAND VARIANT FILTER */}
      <H6 mb={2}>Brands</H6>
      {brandList && brandList.length > 0
        ? brandList.map((item) => (
            <FormControlLabel
              key={item.name}
              sx={{
                display: "flex",
              }}
              label={<Span color="inherit">{item.name}</Span>}
              control={
                <Checkbox
                  size="small"
                  color="secondary"
                  onChange={(e) =>
                    brandFilter({
                      brandName: item.name,
                      isChecked: e.target.checked,
                    })
                  }
                />
              }
            />
          ))
        : "Loading..."}

      {/* <Divider
        sx={{
          my: 3,
        }}
      />

      {otherOptions.map((item) => (
        <FormControlLabel
          key={item}
          sx={{
            display: "flex",
          }}
          label={<Span color="inherit">{item}</Span>}
          control={<Checkbox size="small" color="secondary" />}
        />
      ))} */}

      <Divider
        sx={{
          my: 3,
        }}
      />

      {/* RATINGS FILTER */}
      <H6 mb={2}>Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              color="secondary"
              onChange={(e) =>
                ratingFilter({
                  rating: item,
                  isChecked: e.target.checked,
                })
              }
            />
          }
          label={<Rating size="small" value={item} color="warn" readOnly />}
          sx={{
            display: "flex",
          }}
          key={item}
        />
      ))}

      <Divider
        sx={{
          my: 3,
        }}
      />

      {/* COLORS VARIANT FILTER */}
      <H6 mb={2}>Colors</H6>
      <FlexBox mb={2} flexWrap="wrap" gap={1}>
        {colorList.map((item) => (
          <Box
            key={item}
            flexShrink={0}
            sx={{
              width: 25,
              height: 25,
              bgcolor: item,
              cursor: "pointer",
              borderRadius: "50%",
            }}
            onClick={() => colorFilter(item)}
          />
        ))}
      </FlexBox>
    </Card>
  );
};
// const categoryList = [
//   {
//     title: "Bath Preparations",
//     subCategories: ["Bubble Bath", "Bath Capsules", "Others"],
//   },
//   {
//     title: "Eye Makeup Preparations",
//   },
//   {
//     title: "Fragrance",
//   },
//   {
//     title: "Hair Preparations",
//   },
// ];
// const brandList = ["Macc", "Karts", "Baals", "Bukks", "Luasis"];
const otherOptions = ["On Sale", "In Stock", "Featured"];
const colorList = [
  "#1C1C1C",
  "#FF7A7A",
  "#FFC672",
  "#84FFB5",
  "#70F6FF",
  "#6B7AFF",
];
export default ProductFilterCard;
