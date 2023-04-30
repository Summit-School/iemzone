import Router from "next/router";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import { CategoryRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
// ============================================================================
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { userCategories } from "../../../redux/reducers/admin/category";
import userId from "utils/userId";

// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "id",
    label: "ID",
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "image",
    label: "Image",
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    align: "left",
  },
  {
    id: "parent-category",
    label: "Parent Category",
    align: "left",
  },
  {
    id: "featured",
    label: "Featured",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

// =============================================================================
CategoryList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function CategoryList(props) {
  // const { categories } = props;
  const userCats = useSelector((state) => state.categories.categories);
  console.log("cats", userCats);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const categories = userCats.categories;

  useEffect(() => {
    const id = userId();
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

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredCategories = categories?.map((item) => ({
    id: item._id,
    name: item.name,
    slug: item.slug,
    image: item.image,
    featured: item.featured,
    description: item.description,
    parent: item.parent[0],
  }));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredCategories,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Product Categories</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Category"
        searchPlaceholder="Search Category..."
        handleBtnClick={() => Router.push("/admin/categories/create")}
      />

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={categories.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((category) => (
                  <CategoryRow
                    item={category}
                    key={category.id}
                    selected={selected}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(categories.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const categories = await api.category();
  return {
    props: {
      categories,
    },
  };
};
