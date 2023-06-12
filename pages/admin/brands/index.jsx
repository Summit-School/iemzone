import Router from "next/router";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import { BrandRow } from "pages-sections/admin";
import useMuiTable from "hooks/useMuiTable";
import api from "utils/__api__/dashboard";
// ============================================================================
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { userBrands } from "../../../src/redux/reducers/admin/brand";
import userId from "utils/userId";

// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "id",
    label: "ID",
    align: "center",
  },
  {
    id: "name",
    label: "Name",
    align: "center",
  },
  {
    id: "logo",
    label: "Logo",
    align: "center",
  },
  {
    id: "featured",
    label: "Featured",
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

// =============================================================================
BrandList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function BrandList(props) {
  // const { brands } = props
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const userBrds = useSelector((state) => state.brands.brands);
  const brands = userBrds?.brands;

  useEffect(() => {
    const id = userId();
    dispatch(userBrands(id))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredBrands = brands?.map((item) => ({
    id: item._id,
    slug: item.slug,
    name: item.name,
    image: item.image,
    featured: item.featured,
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
    listData: filteredBrands,
    defaultSort: "name",
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Product Brands</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Brand"
        searchPlaceholder="Search Brand..."
        handleBtnClick={() => Router.push("/admin/brands/create")}
      />

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 600,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                numSelected={selected.length}
                rowCount={brands?.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((brand) => (
                  <BrandRow brand={brand} key={brand.id} selected={selected} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(filteredList.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const brands = await api.brands();
  return {
    props: {
      brands,
    },
  };
};
