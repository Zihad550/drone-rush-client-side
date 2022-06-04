import { ILoginData } from "../types/LoginType";
import IUser from "../types/UserType";
import httpReq from "./http.service";

class AuthService {
  async login(payload: ILoginData): Promise<IUser> {
    const { data } = await httpReq.post("/login", payload);
    return data;
  }
}

export default new AuthService();
