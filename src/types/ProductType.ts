export default interface IProduct {
  img: string;
  name: string;
  disc: string;
  price: string;
  category: string;
  reviews: IReview[];
  brand: string;
  _id: string;
}

interface IReview {
  user: string;
  comment: string;
  rating: string;
}
