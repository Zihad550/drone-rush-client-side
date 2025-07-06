import Spinner from '@/components/Shared/Spinner';
import Title from '@/components/ui/Title';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import { Box, Container, Stack } from '@mui/material';
import Banner from './Banner';
import FAQ from './FAQ';
import Features from './Features';
import Products from './Products';

const Home = () => {
  const { data, isLoading } = useGetProductsQuery({ sort: '-quantity' });

  const date = new Date();
  const title = `The Best Drones for ${date.getFullYear()}`;
  if (isLoading) return <Spinner />;
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Banner />
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Stack spacing={6}>
          <Box>
            <Title>{title}</Title>
            <Products products={data?.data ?? []} />
          </Box>
          <Features />
          <FAQ />
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
