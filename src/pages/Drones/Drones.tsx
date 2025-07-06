import Spinner from '@/components/Shared/Spinner';
import Title from '@/components/ui/Title';
import { useGetBrandsQuery } from '@/redux/features/brand/brandApi';
import { useGetCategoriesQuery } from '@/redux/features/category/categoryApi';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ClearIcon from '@mui/icons-material/Clear';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';
import FAQ from '../Home/FAQ';
import Features from '../Home/Features';
import Products from '../Home/Products';

const PRODUCTS_PER_PAGE = 8;
const Drones = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');

  const { data, isLoading } = useGetProductsQuery({
    page,
    sort: '-quantity',
    limit: PRODUCTS_PER_PAGE,
    ...(category && { category }),
    ...(brand && { brand }),
  });
  const { data: categoriesData } = useGetCategoriesQuery({});
  const { data: brandsData } = useGetBrandsQuery({});

  if (isLoading) return <Spinner />;

  const handleCurrentPage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Stack spacing={6}>
          {/* Filters Section */}
          <Paper
            elevation={0}
            sx={{
              position: 'sticky',
              top: 16,
              zIndex: 10,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              mb: 2,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: { sm: 'center' },
              bgcolor: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 24px 0 rgba(30,41,59,0.10)',
              border: '1.5px solid',
              borderColor: 'grey.100',
              transition: 'box-shadow 0.2s, border-color 0.2s',
              '&:hover': {
                boxShadow: '0 8px 32px 0 rgba(30,41,59,0.16)',
                borderColor: 'primary.light',
              },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: { xs: 1, sm: 0 } }}
            >
              <FilterAltRoundedIcon
                color="primary"
                sx={{ fontSize: 28, mr: 1 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mr: 2, color: 'primary.main' }}
              >
                Filters
              </Typography>
            </Stack>
            <FormControl sx={{ minWidth: 180, flex: 1 }} size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <CategoryRoundedIcon color="action" />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  fontWeight: 600,
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { borderRadius: 2, boxShadow: 3 },
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {categoriesData?.data?.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180, flex: 1 }} size="small">
              <InputLabel>Brand</InputLabel>
              <Select
                value={brand}
                label="Brand"
                onChange={(e) => {
                  setBrand(e.target.value);
                  setPage(1);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <BusinessRoundedIcon color="action" />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  fontWeight: 600,
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { borderRadius: 2, boxShadow: 3 },
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {brandsData?.data?.map((b) => (
                  <MenuItem key={b._id} value={b._id}>
                    {b.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {(category || brand) && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ClearIcon />}
                onClick={() => {
                  setCategory('');
                  setBrand('');
                  setPage(1);
                }}
                sx={{
                  ml: { sm: 2 },
                  borderRadius: 2,
                  fontWeight: 600,
                  minWidth: 120,
                }}
              >
                Clear Filters
              </Button>
            )}
          </Paper>
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
          {/* Features Section */}
          <Features />
          {/* FAQ Section */}
          <FAQ />
        </Stack>
      </Container>
    </Box>
  );
};

export default Drones;
