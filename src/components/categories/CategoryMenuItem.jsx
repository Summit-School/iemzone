// import Link from "next/link";
import { Box, MenuItem, styled, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useSettings from "hooks/useSettings";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../redux/reducers/admin/product";

//styled component
const Wrapper = styled(Box)(({ theme }) => ({
  "& .category-dropdown-link": {
    height: 40,
    display: "flex",
    minWidth: "278px",
    cursor: "pointer",
    whiteSpace: "pre",
    padding: "0px 1rem",
    alignItems: "center",
    transition: "all 250ms ease-in-out",
    "& .title": {
      flexGrow: 1,
      paddingLeft: "0.75rem",
    },
  },
  "&:hover": {
    "& > .category-dropdown-link": {
      color: theme.palette.primary.main,
      background: theme.palette.action.hover,
    },
    "& > .mega-menu": {
      display: "block",
    },
  },
}));

// =============================================================

// =============================================================

const CategoryMenuItem = (props) => {
  const { href, title, caret, children, ...rest } = props;
  const { settings } = useSettings();
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

  return (
    <Wrapper>
      {/* <Link href={href}>
        <MenuItem className="category-dropdown-link">
          {rest.icon && <rest.icon fontSize="small" color="inherit" />}
          <span className="title">{title}</span>
          {caret &&
            (settings.direction === "ltr" ? (
              <ChevronRight fontSize="small" />
            ) : (
              <ChevronLeft fontSize="small" />
            ))}
        </MenuItem>
      </Link> */}
      <Button
        sx={{
          padding: 0,
          marginTop: 0,
          textAlign: "left",
        }}
        onClick={() => searchProductHandler(title)}
      >
        <MenuItem className="category-dropdown-link">
          {rest.icon && <rest.icon fontSize="small" color="inherit" />}
          <span className="title">{title}</span>
          {caret &&
            (settings.direction === "ltr" ? (
              <ChevronRight fontSize="small" />
            ) : (
              <ChevronLeft fontSize="small" />
            ))}
        </MenuItem>
      </Button>

      {children}
    </Wrapper>
  );
};
CategoryMenuItem.defaultProps = {
  caret: true,
};
export default CategoryMenuItem;
