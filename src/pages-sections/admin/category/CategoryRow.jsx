import { useState } from "react";
import { Avatar } from "@mui/material";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import BazaarSwitch from "components/BazaarSwitch";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledIconButton,
  StyledTableCell,
} from "../StyledComponents";
import { useRouter } from "next/router";

// ========================================================================
import userId from "utils/userId";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  deleteCategory,
  userCategories,
  changeFeaturedCategory,
} from "../../../../redux/reducers/admin/category";

// ========================================================================

const CategoryRow = ({ item, selected }) => {
  const { image, name, description, featured, id, slug, parent } = item;
  // const router = useRouter();
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(name) !== -1;
  // const handleNavigate = () => router.push(`/admin/categories/${id}`);
  const userID = userId();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const setFeaturedCategoryHandler = () => {
    dispatch(changeFeaturedCategory(id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(userCategories(userID));
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

  const deleteCategoryHandler = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmation) {
      dispatch(deleteCategory(id))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            dispatch(userCategories(userID));
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
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
      <StyledTableCell align="left">#{id}</StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{name}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Avatar
          src={`${image}`}
          sx={{
            borderRadius: "8px",
          }}
        />
      </StyledTableCell>

      <StyledTableCell align="left">{description}</StyledTableCell>

      <StyledTableCell align="left">{parent}</StyledTableCell>

      <StyledTableCell align="left" onClick={setFeaturedCategoryHandler}>
        <BazaarSwitch
          color="info"
          checked={featuredCategory}
          onChange={() => setFeaturedCategory((state) => !state)}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        {/* <StyledIconButton onClick={handleNavigate}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton> */}

        <StyledIconButton>
          <Delete onClick={deleteCategoryHandler} />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};
export default CategoryRow;
