import Spinner from '@/components/Shared/Spinner';
import Title from '@/components/ui/Title';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Banner />
        </motion.div>
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
          <Stack spacing={6}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <Box sx={{ my: 4 }}>
                <Title>{title}</Title>
                <Products products={data?.data ?? []} />
              </Box>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Features />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <FAQ />
            </motion.div>
            {/* Newsletter Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, md: 4 },
                  borderRadius: 3,
                  mt: 6,
                  mb: 2,
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                }}
              >
                <Title variant="h5" sx={{ mb: 1 }}>
                  Subscribe to our Newsletter
                </Title>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Get the latest drone news, deals, and updates straight to your
                  inbox.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ maxWidth: 500, mx: 'auto' }}
                >
                  <TextField
                    type="email"
                    label="Your Email"
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1, bgcolor: 'background.default' }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ px: 4, py: 1, fontWeight: 600 }}
                  >
                    Subscribe
                  </Button>
                </Stack>
              </Paper>
            </motion.div>
            {/* Contact Us Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 2, md: 4 },
                  borderRadius: 3,
                  mt: 2,
                  mb: 4,
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                }}
              >
                <Title variant="h5" sx={{ mb: 1 }}>
                  Contact Us
                </Title>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Have questions or need help? Reach out to our team and we'll
                  get back to you as soon as possible.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ maxWidth: 500, mx: 'auto' }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Email:{' '}
                    <a
                      href="mailto:jehadhossain008@gmail.com"
                      style={{ color: '#1976d2', textDecoration: 'none' }}
                    >
                      jehadhossain008@gmail.com
                    </a>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Phone:{' '}
                    <a
                      href="tel:+8801855629170"
                      style={{ color: '#1976d2', textDecoration: 'none' }}
                    >
                      +88 01855629170
                    </a>
                  </Typography>
                </Stack>
              </Paper>
            </motion.div>
          </Stack>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Home;
