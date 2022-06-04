import Spinner from "components/Shared/Spinner";
import useAPI from "hooks/useAPI";
import ProductService from "services/Product.service";
import Products from "../Home/Products";

const Drones = () => {
  const { data: drones } = useAPI(() => ProductService.getAllProducts(0));
  if (!drones) return <Spinner />;
  return (
    <div>
      <Products products={drones} title="All Available Drones" />
    </div>
  );
};

export default Drones;
