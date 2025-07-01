import IOrder from "types/OrderType";
import httpReq from "./http.service";

class OrderService {
  async getOrders(email: string): Promise<IOrder[]> {
    const data: any = await httpReq.get(`/orders/${email}`);
    return data;
  }
}

export default new OrderService();
