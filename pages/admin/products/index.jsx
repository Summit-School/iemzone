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
import { ProductRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
// =============================================================================
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { shopProducts } from "../../../redux/reducers/admin/product";
import { getShop } from "../../../redux/reducers/shop";
import userId from "utils/userId";

// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    align: "left",
  },
  {
    id: "brand",
    label: "Brand",
    align: "left",
  },
  {
    id: "price",
    label: "Price",
    align: "left",
  },
  {
    id: "published",
    label: "Published",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

// =============================================================================
ProductList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function ProductList(props) {
  // const { products } = props;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const shopProductsList = useSelector((state) => state.products.products);
  const products = shopProductsList?.products;

  useEffect(() => {
    const id = userId();
    dispatch(getShop(id))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          return enqueueSnackbar(res.payload, {
            variant: "error",
          });
        }
        const shopId = res.payload.shop._id;
        dispatch(shopProducts(shopId));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredProducts = products?.map((item) => ({
    id: item._id,
    slug: item.slug,
    name: item.title,
    brand: item.brand,
    price: item.salesPrice,
    image: item.thumbnail,
    published: item.published,
    category: item.categories[0],
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
    listData: filteredProducts,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Product List</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Product"
        searchPlaceholder="Search Product..."
        handleBtnClick={() => Router.push("/admin/products/create")}
      />

      <Card>
        <Scrollbar autoHide={false}>
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
                rowCount={products?.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredProducts?.map((product, index) => (
                  <ProductRow product={product} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(products?.length / rowsPerPage) || 0}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const products = await api.products();
  return {
    props: {
      products,
    },
  };
};
