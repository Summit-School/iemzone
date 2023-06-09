import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Add, Favorite, Remove, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H3, Span } from "components/Typography";
import BazaarRating from "components/BazaarRating";
import { useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
import { FlexBox } from "../flex-box";
import { calculateDiscount, currency } from "lib";
// =================================================================
import { useDispatch } from "react-redux";
// import userId from "utils/userId";
import {
  addToWishlist,
  removeFromWishlist,
} from "redux/reducers/authentication";
import { isExpired, decodeToken } from "react-jwt";

// styled components
const StyledBazaarCard = styled(BazaarCard)({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  ":hover": {
    "& .hover-box": {
      opacity: 1,
    },
  },
});
const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const StyledChip = styled(Chip)({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
});
const HoverIconWrapper = styled(Box)({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
});
const ContentWrapper = styled(Box)({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

// ========================================================

// ========================================================

const ProductCard1 = ({
  id,
  slug,
  title,
  regularPrice,
  salesPrice,
  imgUrl,
  rating = 5,
  hideRating,
  hoverEffect,
  discount = 5,
  showProductSize,
  description,
  category,
  isFavoriteBtn,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  const cartItem = state.cart?.find((item) => item.slug === slug);
  const [userId, setUserId] = useState("");

  const reduxDispatch = useDispatch();

  useEffect(() => {
    const userToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("temzone-user")
        : false;
    if (userToken) {
      const isTokenExpired = isExpired(userToken);
      if (isTokenExpired === true) {
        return;
      }
      const decodedToken = decodeToken(userToken);
      const id = decodedToken.userId;
      setUserId(id);
      return;
    }
  }, []);

  const wishlistHandler = async (param) => {
    if (userId === "") {
      window.alert("Please login to add to wishlist");
      return;
    }
    const item = {
      id,
      imgUrl,
      name: title,
      regularPrice,
      salesPrice,
      slug,
      rating,
      discount,
    };
    const data = {
      userId,
      item,
    };
    if (isFavoriteBtn) {
      reduxDispatch(removeFromWishlist(data))
        .then((res) => {
          if (res.meta.requestStatus === "rejected") {
            enqueueSnackbar(res.payload, {
              variant: "error",
            });
          }
          if (res.meta.requestStatus === "fullfilled") {
            enqueueSnackbar(res.payload, {
              variant: "success",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      if (!param === true) {
        reduxDispatch(addToWishlist(data))
          .then((res) => {
            if (res.meta.requestStatus === "rejected") {
              enqueueSnackbar(res.payload, {
                variant: "error",
              });
            }
            if (res.meta.requestStatus === "fullfilled") {
              enqueueSnackbar(res.payload, {
                variant: "success",
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  const handleCartAmountChange = (product, type) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: product,
    });
    // SHOW ALERT PRODUCT ADDED OR REMOVE
    if (type === "remove")
      enqueueSnackbar("Remove from Cart", {
        variant: "error",
      });
    else
      enqueueSnackbar("Added to Cart", {
        variant: "success",
      });
  };

  const price = salesPrice;

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {!!discount && (
          <StyledChip color="primary" size="small" label={`${discount}% off`} />
        )}

        <HoverIconWrapper className="hover-box">
          <IconButton onClick={toggleDialog}>
            <RemoveRedEye color="disabled" fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => {
              toggleIsFavorite(), wishlistHandler(isFavorite);
            }}
          >
            {isFavoriteBtn ? (
              <Favorite color="primary" fontSize="small" />
            ) : isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" color="disabled" />
            )}
          </IconButton>
        </HoverIconWrapper>

        <Link href={`/product/${id}`}>
          <LazyImage
            priority
            src={`${imgUrl.image}`}
            width={500}
            height={500}
            alt={title}
          />
        </Link>
      </ImageWrapper>

      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{
          title,
          price,
          id,
          slug,
          imgGroup: [imgUrl, imgUrl],
          description,
          category,
          rating,
        }}
      />

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link href={`/product/${id}`}>
              <H3
                mb={1}
                title={title}
                fontSize="14px"
                fontWeight="600"
                className="title"
                color="text.secondary"
              >
                {title}
              </H3>
            </Link>

            {!hideRating && (
              <BazaarRating value={rating || 0} color="warn" readOnly />
            )}

            {showProductSize && (
              <Span color="grey.600" mb={1} display="block">
                {showProductSize}
              </Span>
            )}

            <FlexBox alignItems="center" gap={1} mt={0.5}>
              <Box fontWeight="600" color="primary.main">
                {calculateDiscount(regularPrice, discount)} XAF
              </Box>

              {!!discount && (
                <Box color="grey.600" fontWeight="600">
                  {/* <del>{currency(regularPrice)}</del> */}
                  <del>{regularPrice} XAF</del>
                </Box>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            width="30px"
            alignItems="center"
            className="add-cart"
            flexDirection="column-reverse"
            justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
          >
            <Button
              color="primary"
              variant="outlined"
              sx={{
                padding: "3px",
              }}
              onClick={handleCartAmountChange({
                id,
                slug,
                price,
                imgUrl,
                name: title,
                qty: (cartItem?.qty || 0) + 1,
              })}
            >
              <Add fontSize="small" />
            </Button>

            {!!cartItem?.qty && (
              <Fragment>
                <Box color="text.primary" fontWeight="600">
                  {cartItem?.qty}
                </Box>

                <Button
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: "3px",
                  }}
                  onClick={handleCartAmountChange(
                    {
                      id,
                      slug,
                      price,
                      imgUrl,
                      name: title,
                      qty: (cartItem?.qty || 0) - 1,
                    },
                    "remove"
                  )}
                >
                  <Remove fontSize="small" />
                </Button>
              </Fragment>
            )}
          </FlexBox>
        </FlexBox>
      </ContentWrapper>
    </StyledBazaarCard>
  );
};
export default ProductCard1;
