export default interface IProduct {
  img: string;
  name: string;
  disc: string;
  price: string;
  category: string;
  reviews: IReview[];
  brand: string;
  shipping: string;
  qty?: number;
  totalPrice?: number;
  _id: string;
}

interface IReview {
  user: string;
  comment: string;
  rating: string;
}
