import Spinner from '@/components/Shared/Spinner';
import AppSelect from '@/components/ui/AppSelect';
import { useGetOrdersQuery } from '@/redux/features/order/orderApi';
import type { TOrderStatus } from '@/types';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Snackbar,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import UpdateOrderStatusModal from './UpdateStatusModal';

interface Column {
  id: number;
  label: string;
  minWidth?: number;
}

const orderStatusOptions: { value: TOrderStatus; label: string }[] = [
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'processing',
    label: 'Processing',
  },
  {
    value: 'packaged',
    label: 'Packaged',
  },
  {
    value: 'delivering',
    label: 'Delivering',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'admin-cancelled',
    label: 'Admin cancelled',
  },
  {
    value: 'user-cancelled',
    label: 'User cancelled',
  },
];

const ManageOrders = () => {
  const [status, setStatus] = useState<TOrderStatus | undefined>(undefined);
  console.log(status);
  const [page, setPage] = useState(0);
  const { data, isLoading } = useGetOrdersQuery({
    status,
    page,
    fields: ['product', 'status'],
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleStatus: (event: SelectChangeEvent) => void = (e) => {
    setStatus(e.target.value as TOrderStatus);
  };

  const columns: readonly Column[] = [
    { id: 1, label: 'Product', minWidth: 150 },
    { id: 2, label: 'Customer', minWidth: 100 },
    {
      id: 6,
      label: 'Actions',
      minWidth: 170,
    },
  ];

  if (isLoading) return <Spinner />;
  if (!data?.data && !status) return <p>No orders</p>;
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '80vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label === 'Status' ? (
                      <AppSelect
                        sx={{ width: 150 }}
                        options={orderStatusOptions}
                        name="status"
                        label="Status"
                        defaultValue=""
                        handleChange={handleStatus}
                      />
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((order) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                  {/* product img & name */}
                  <TableCell sx={{ width: { md: '13%', xs: '15%' } }}>
                    {Array.isArray(order.products) &&
                      order.products.map((product, idx) =>
                        typeof product === 'object' && product !== null ? (
                          <Box
                            key={product._id ?? idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <img
                              src={product.img ?? ''}
                              alt=""
                              width={32}
                              height={32}
                            />
                            <Typography variant="body2">
                              {product.name ?? ''}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${product.price ?? ''}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography key={idx} variant="body2">
                            {product}
                          </Typography>
                        )
                      )}
                  </TableCell>
                  {/* customer details */}
                  <TableCell>
                    <Typography variant="body2">
                      Name:{' '}
                      {String(
                        typeof order.user === 'object' &&
                          order.user !== null &&
                          'name' in order.user
                          ? order.user.name
                          : order.user
                      )}
                    </Typography>
                    <Typography variant="body2">
                      Email:{' '}
                      {String(
                        typeof order.user === 'object' &&
                          order.user !== null &&
                          'email' in order.user
                          ? order.user.email
                          : ''
                      )}
                    </Typography>
                    <Typography variant="body2">
                      Phone:{' '}
                      {String(
                        typeof order.user === 'object' &&
                          order.user !== null &&
                          'phone' in order.user
                          ? order.user.phone
                          : ''
                      )}
                    </Typography>
                  </TableCell>
                  {/* order actions */}
                  <TableCell>
                    <ButtonGroup size="small" variant="outlined">
                      <UpdateOrderStatusModal
                        status={order.status}
                        id={order._id}
                        orderStatusOptions={orderStatusOptions}
                      />
                      <Button color="error">Delete Order</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.meta?.total ?? 0}
          rowsPerPage={data?.meta?.limit ?? 10}
          page={data?.meta?.page ?? 0}
          onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Snackbar
        open={isUpdated}
        autoHideDuration={6000}
        onClose={() => setIsUpdated(false)}
      >
        <Alert
          onClose={() => setIsUpdated(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Updated Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={error.length > 0}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert
          onClose={() => setError('')}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ManageOrders;
