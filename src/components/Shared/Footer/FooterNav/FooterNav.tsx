import { Box, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

interface IFooterNav {
  id: number;
  name: string;
  link: string;
}

interface IFooterNavProps {
  navs: IFooterNav[];
  title?: string;
  subtitle?: string;
}

const FooterNav = ({ navs, title, subtitle }: IFooterNavProps) => {
  return (
    <Box>
      <Typography
        sx={{ mb: { md: 2.5, xs: 1.5 } }}
        variant={title ? 'h5' : 'subtitle2'}
      >
        {title || subtitle}
      </Typography>

      {navs.map((nav) => (
        <Box key={nav.id} sx={{ mb: 1 }}>
          <MuiLink
            component={RouterLink}
            to={nav.link}
            color="grey.100"
            underline="hover"
            sx={{
              fontFamily: 'Roboto, "Open Sans", "Helvetica Neue", sans-serif',
              fontSize: 15,
              transition: 'color 0.3s, margin-left 0.3s',
              '&:hover': {
                color: 'primary.light',
                ml: 1,
              },
            }}
          >
            {nav.name}
          </MuiLink>
        </Box>
      ))}
    </Box>
  );
};

export default FooterNav;
