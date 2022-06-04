import Spinner from "components/Shared/Spinner";
import IProduct from "types/ProductType";
import useAPI from "../../../hooks/useAPI";
import ProductService from "../../../services/Product.service";
import Products from "../Home/Products";

const Explore = () => {
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useAPI<IProduct[]>(ProductService.getAllProducts);

  if (isLoading || !products) return <Spinner />;
  return (
    <>
      <Products products={products} />
    </>
  );
};

export default Explore;
