import Spinner from "components/Shared/Spinner";
import IProduct from "types/ProductType";
import useAPI from "../../../hooks/useAPI";
import ProductService from "../../../services/Product.service";
import Banner from "./Banner";
import Products from "./Products";
import Reviews from "./Reviews";

const Home = () => {
  const { data: products } = useAPI<IProduct[]>(() =>
    ProductService.getAllProducts(6)
  );
  const date = new Date();
  const title = ` The Best Drones for ${date.getFullYear()}`;
  if (!products) return <Spinner />;
  return (
    <div>
      <Banner />
      <Products products={products} title={title} />
      <Reviews />
    </div>
  );
};

export default Home;
