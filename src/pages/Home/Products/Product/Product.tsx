import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import type IProduct from "@/types/ProductType";

const Product = ({
  drone: { name, description: disc, price, img, _id },
}: {
  drone: IProduct;
}) => {
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 12, md: 12, lg: 6 }}>
      <Card
        sx={{
          boxShadow: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "230px" }}
          height="100%"
          image={img}
        />

        <CardContent sx={{ py: "auto" }}>
          <Typography gutterBottom variant="h6" component="h4">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {disc}
          </Typography>
          <Typography variant="h5" color="success.main" sx={{ mb: 0, mt: 1 }}>
            Price: ${price}
          </Typography>
          <Button
            onClick={() => navigate(`/details/${_id}`)}
            variant="contained"
            size="small"
            sx={{ color: "white" }}
          >
            Details
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Product;
