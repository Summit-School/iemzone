import Link from "next/link";
import { Box, Card, Grid, Button } from "@mui/material";
import StyledMegaMenu from "./StyledMegaMenu";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
// import { NavLink } from "components/nav-link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../../redux/reducers/admin/product";

// =========================================================

// =========================================================

const MegaMenu1 = ({ data, minWidth }) => {
  const { categories, rightImage, bottomImage } = data || {};
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const searchProductHandler = (param) => {
    dispatch(searchProduct(param))
      .then((res) => {
        router.push(`/product/search/${param}`);
        if (res.meta.requestStatus === "rejected") {
          return enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return categories ? (
    <StyledMegaMenu>
      <Card
        elevation={2}
        sx={{
          ml: "1rem",
          minWidth,
        }}
      >
        <FlexBox px={2.5} py={1.75} alignItems="unset">
          <Box flex="1 1 0">
            <Grid container spacing={4}>
              {categories?.map((item, ind) => (
                <Grid item md={3} key={ind}>
                  {item.href ? (
                    // <NavLink className="title-link" href={item.href}>
                    //   {item.title}
                    // </NavLink>
                    <Button
                      className="title-link"
                      onClick={() => searchProductHandler(item.title)}
                    >
                      {item.title}
                    </Button>
                  ) : (
                    <Box className="title-link">{item.title}</Box>
                  )}

                  {item.subCategories?.map((sub, ind) => (
                    // <NavLink className="child-link" href={sub.href} key={ind}>
                    //   {sub.title}
                    // </NavLink>
                    <Button
                      className="child-link"
                      key={ind}
                      onClick={() => searchProductHandler(sub.title)}
                    >
                      {sub.title}
                    </Button>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>

          {rightImage && (
            <Box mt={1.5}>
              <Link href={rightImage.href}>
                <LazyImage
                  src={rightImage.imgUrl}
                  width={137}
                  height={318}
                  alt="banner"
                />
              </Link>
            </Box>
          )}
        </FlexBox>

        {bottomImage && (
          <Link href={bottomImage.href}>
            <Box position="relative" height={150} width="100%">
              <LazyImage
                fill
                alt="banner"
                src={bottomImage.imgUrl}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            </Box>
          </Link>
        )}
      </Card>
    </StyledMegaMenu>
  ) : null;
};
MegaMenu1.defaultProps = {
  minWidth: "760px",
};
export default MegaMenu1;
