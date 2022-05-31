import IDrone from "../types/DroneType";
import httpReq from "./http.service";

class ProductService {
  async getAllProducts(): Promise<IDrone[]> {
    const { data } = await httpReq.get("/drones");
    return data;
  }

  async addProduct(body: IDrone): Promise<IDrone> {
    const { data } = await httpReq.post("/drones", body);
    return data;
  }
}

export default new ProductService();
