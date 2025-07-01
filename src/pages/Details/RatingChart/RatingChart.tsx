import RatingBar from "./RatingBar";
import { Box } from "@mui/material";

interface IRatingChartProps {
  totalRatings: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStars: number;
}
const RatingChart = ({
  totalRatings,
  fiveStars,
  fourStars,
  threeStars,
  twoStars,
  oneStars,
}: IRatingChartProps) => {
  const ratings = [
    {
      id: 1,
      value: 5,
      total: fiveStars,
      average: (fiveStars * 100) / totalRatings,
    },
    {
      id: 2,
      value: 4,
      total: fourStars,
      average: (fourStars * 100) / totalRatings,
    },
    {
      id: 3,
      value: 3,
      total: threeStars,
      average: (threeStars * 100) / totalRatings,
    },
    {
      id: 4,
      value: 2,
      total: twoStars,
      average: (twoStars * 100) / totalRatings,
    },
    {
      id: 5,
      value: 1,
      total: oneStars,
      average: (oneStars * 100) / totalRatings,
    },
  ];
  return (
    <Box sx={{ ml: 10 }}>
      {ratings.map((rating) => (
        <RatingBar
          key={rating.id}
          value={rating.value}
          total={rating.total}
          average={rating.average}
        />
      ))}
    </Box>
  );
};

export default RatingChart;
