import Spinner from '@/components/Shared/Spinner';
import Title from '@/components/ui/Title';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import { Box, Container, Pagination, Stack } from '@mui/material';
import React, { useState } from 'react';
import Products from '../Home/Products';

const PRODUCTS_PER_PAGE = 8;
const Drones = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetProductsQuery({
    page,
    sort: '-quantity',
    limit: PRODUCTS_PER_PAGE,
  });

  if (isLoading) return <Spinner />;

  const handleCurrentPage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log('value ->', value);
  };
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Stack spacing={6}>
          <Box>
            <Title>All Available Drones</Title>
            <Products products={data?.data ?? []} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <Pagination
              count={Math.ceil((data?.meta?.total ?? 0) / PRODUCTS_PER_PAGE)}
              variant="outlined"
              color="primary"
              onChange={handleCurrentPage}
              sx={{
                '.MuiPaginationItem-root': {
                  fontWeight: 600,
                  fontSize: { xs: 16, md: 18 },
                },
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Drones;
