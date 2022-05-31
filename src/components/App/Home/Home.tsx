import useAPI from "../../../hooks/useAPI";
import ProductService from "../../../services/Product.service";
import IDrone from "../../../types/DroneType";
import Spinner from "../../Shared/Spinner";
import Banner from "./Banner";
import Drones from "./Drones";
import Reviews from "./Reviews";

const Home = () => {
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useAPI<IDrone[]>(ProductService.getAllProducts);

  console.log(products);

  if (isLoading || !products) return <Spinner />;
  return (
    <div>
      <Banner />
      <Drones products={products} />
      <Reviews />
    </div>
  );
};

export default Home;
