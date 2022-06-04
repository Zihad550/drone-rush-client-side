import Spinner from "components/Shared/Spinner";
import IProduct from "types/ProductType";
import useAPI from "../../../hooks/useAPI";
import ProductService from "../../../services/Product.service";
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
