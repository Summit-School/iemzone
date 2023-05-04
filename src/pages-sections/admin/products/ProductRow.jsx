import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { currency } from "lib";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../StyledComponents";

// ========================================================================
import userId from "utils/userId";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  shopProducts,
  setPublishedProducts,
  deleteProduct,
} from "../../../../redux/reducers/admin/product";
import { getShop } from "../../../../redux/reducers/shop";

// ========================================================================

const ProductRow = ({ product }) => {
  const { category, name, price, image, brand, id, published, slug } = product;
  const router = useRouter();
  const [productPulish, setProductPublish] = useState(published);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const shop = useSelector((state) => state.shop.shop);
  const shopId = shop?.shop._id;

  useEffect(() => {
    const id = userId();
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
  }, []);

  const setPublishedProductHandler = () => {
    dispatch(setPublishedProducts(id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          enqueueSnackbar(res.payload, {
            variant: "success",
          });
        }
        if (res.meta.requestStatus === "rejected") {
          enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteProductHandler = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmation) {
      dispatch(deleteProduct(id))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            dispatch(shopProducts(shopId));
            enqueueSnackbar(res.payload, {
              variant: "success",
            });
          }
          if (res.meta.requestStatus === "rejected") {
            enqueueSnackbar(res.payload, {
              variant: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return;
    }
  };

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar
            src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${image}`}
            sx={{
              borderRadius: "8px",
            }}
          />
          <Box>
            <Paragraph>{name}</Paragraph>
            <Small color="grey.600">#{id.split("-")[0]}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>

      {/* <StyledTableCell align="left">
        <Avatar
          src={brand}
          sx={{
            width: 55,
            height: "auto",
            borderRadius: 0,
          }}
        />
      </StyledTableCell> */}
      <StyledTableCell align="left">{brand}</StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>

      <StyledTableCell align="left" onClick={setPublishedProductHandler}>
        <BazaarSwitch
          color="info"
          checked={productPulish}
          onChange={() => setProductPublish((state) => !state)}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton
          onClick={() => router.push(`/admin/products/${slug}`)}
        >
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton onClick={deleteProductHandler}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};
export default ProductRow;
