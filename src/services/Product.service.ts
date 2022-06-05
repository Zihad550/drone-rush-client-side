import IProduct from "types/ProductType";
import httpReq from "./http.service";

class ProductService {
  async getAllProducts({
    productsPerPage,
    currentPage,
  }: {
    productsPerPage: number;
    currentPage?: number;
  }): Promise<{ products: IProduct[]; totalProducts: number }> {
    const { data } = await httpReq.get(
      `/products?productsPerPage=${productsPerPage}&currentPage=${currentPage}`
    );
    return data;
  }

  async getProduct(id: string): Promise<IProduct> {
    const { data } = await httpReq.get(`/products/${id}`);
    return data;
  }

  async addProduct(body: IProduct): Promise<IProduct> {
    const { data } = await httpReq.post("/drones", body);
    return data;
  }
}

export default new ProductService();
