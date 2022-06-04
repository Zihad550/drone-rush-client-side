import Spinner from "components/Shared/Spinner";
import IProduct from "types/ProductType";
import useAPI from "../../../hooks/useAPI";
import ProductService from "../../../services/Product.service";
import Banner from "./Banner";
import FAQ from "./FAQ";
import Features from "./Features";
import Products from "./Products";

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
      <Features />
      <FAQ />
    </div>
  );
};

export default Home;
