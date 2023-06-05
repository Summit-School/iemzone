import { useState, useEffect } from "react";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import useMuiTable from "hooks/useMuiTable";
import { OrderRow } from "pages-sections/admin";
// import api from "utils/__api__/dashboard";
// ====================================================
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getUserOrders } from "../../../redux/reducers/order";
import userId from "utils/userId";

// ====================================================
// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "id",
    label: "Order ID",
    align: "left",
  },
  {
    id: "qty",
    label: "Qty",
    align: "left",
  },
  {
    id: "purchaseDate",
    label: "Purchase Date",
    align: "left",
  },
  {
    id: "shippingAddress",
    label: "Shipping Address",
    align: "left",
  },
  {
    id: "amount",
    label: "Amount",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

// =============================================================================
OrderList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function OrderList() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const userOrders = useSelector((state) => state.orders.orders);
  const orders = userOrders?.orders;

  useEffect(() => {
    const id = userId();
    dispatch(getUserOrders(id))
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

  // RESHAPE THE ORDER LIST BASED TABLE HEAD CELL ID
  const filteredOrders = orders?.map((item) => ({
    id: item._id,
    qty: item.items.length,
    purchaseDate: item.createdAt,
    shippingAddress: item.shippingData.shipping_address1,
    amount: item.totalPrice,
    status: item.status,
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
    listData: filteredOrders,
    defaultSort: "purchaseDate",
    defaultOrder: "desc",
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Orders</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Search Order"
        handleBtnClick={() => {}}
        searchPlaceholder="Search Order..."
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
                numSelected={selected.length}
                rowCount={filteredList.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((order) => (
                  <OrderRow order={order} key={order.id} />
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
// export const getStaticProps = async () => {
//   const orders = await api.orders();
//   return {
//     props: {
//       orders,
//     },
//   };
// };
