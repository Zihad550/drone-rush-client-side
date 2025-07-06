import type { SxProps, TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
  variant?: TypographyProps['variant'];
  align?: TypographyProps['align'];
  sx?: SxProps;
}

const Title = ({
  children,
  variant = 'h3',
  align = 'center',
  sx,
}: TitleProps) => (
  <Typography
    variant={variant}
    align={align}
    sx={{
      fontWeight: 700,
      color: 'primary.main',
      mb: 2,
      fontSize: { xs: 28, md: 40 },
      letterSpacing: 1,
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Title;
