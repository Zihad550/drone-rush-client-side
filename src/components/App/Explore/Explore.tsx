import useAPI from "../../../hooks/useAPI";
import ProductService from "../../../services/Product.service";
import IDrone from "../../../types/DroneType";
import Spinner from "../../Shared/Spinner";
import Drones from "../Home/Drones/Drones";

const Explore = () => {
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useAPI<IDrone[]>(ProductService.getAllProducts);

  if (isLoading || !products) return <Spinner />;
  return (
    <>
      <Drones products={products} />
    </>
  );
};

export default Explore;
