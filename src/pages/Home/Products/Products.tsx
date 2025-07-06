import type IProduct from '@/types/product.type';
import { Box, Container, Grid, Typography } from '@mui/material';
import Product from './Product';

const Products = ({ products }: { products: IProduct[] }) => (
  <Container sx={{ mt: 10 }}>
    <Grid container spacing={{ xs: 2, lg: 3 }}>
      {products && products.length > 0 ? (
        products.map((product) => <Product key={product._id} drone={product} />)
      ) : (
        <Box
          sx={{
            width: '100%',
            py: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.7 }}>
            No products found.
          </Typography>
        </Box>
      )}
    </Grid>
  </Container>
);

export default Products;
