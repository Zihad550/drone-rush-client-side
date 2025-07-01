import { Box, Typography } from "@mui/material";
import { Link } from "react-router";
import "./FooterNav.css";

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
        variant={title ? "h5" : "subtitle2"}
      >
        {title || subtitle}
      </Typography>

      {navs.map((nav) => (
        <Box className="footer-link-container" key={nav.id} sx={{ mb: 1 }}>
          <Link className="footer-link" to={nav.link}>
            {nav.name}
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default FooterNav;
