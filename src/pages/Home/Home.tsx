import Spinner from "@/components/Shared/Spinner";
import Banner from "./Banner";
import FAQ from "./FAQ";
import Features from "./Features";
import Products from "./Products";
import { useGetProductsQuery } from "@/redux/features/product/productApi";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery("-quantity");

  const date = new Date();
  const title = ` The Best Drones for ${date.getFullYear()}`;
  if (isLoading) return <Spinner />;
  return (
    <div>
      <Banner />
      <Products products={data?.data} title={title} />
      <Features />
      <FAQ />
    </div>
  );
};

export default Home;
