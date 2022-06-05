import Spinner from "components/Shared/Spinner";
import useAPI from "../../../hooks/useAPI";
import ProductService from "../../../services/Product.service";
import Banner from "./Banner";
import FAQ from "./FAQ";
import Features from "./Features";
import Products from "./Products";

const Home = () => {
  const { data } = useAPI(() =>
    ProductService.getAllProducts({ productsPerPage: 6 })
  );
  const date = new Date();
  const title = ` The Best Drones for ${date.getFullYear()}`;
  if (!data?.products) return <Spinner />;
  return (
    <div>
      <Banner />
      <Products products={data.products} title={title} />
      <Features />
      <FAQ />
    </div>
  );
};

export default Home;
