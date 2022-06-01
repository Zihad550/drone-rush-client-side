import useAPI from "../../../hooks/useAPI";
import ProductService from "../../../services/Product.service";
import IProduct from "../../../types/ProductType";
import Spinner from "../../Shared/Spinner";
import Banner from "./Banner";
import Products from "./Products";
import Reviews from "./Reviews";

const Home = () => {
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useAPI<IProduct[]>(ProductService.getAllProducts);

  console.log(products);

  if (isLoading || !products) return <Spinner />;
  return (
    <div>
      <Banner />
      <Products products={products} />
      <Reviews />
    </div>
  );
};

export default Home;
