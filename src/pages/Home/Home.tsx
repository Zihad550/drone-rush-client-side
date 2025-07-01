import Spinner from "@/components/Shared/Spinner";
import Banner from "./Banner";
import FAQ from "./FAQ";
import Features from "./Features";
import Products from "./Products";

const Home = () => {
  // const { data } = useAPI(() =>
  //   ProductService.getAllProducts({ productsPerPage: 6 })
  // );
  const date = new Date();
  const title = ` The Best Drones for ${date.getFullYear()}`;
  const data = [];
  if (!data) return <Spinner />;
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
