import IRegisterData from "types/RegisterType";
import { ILoginData } from "../../../src/types/LoginType";
import IUser from "../../../src/types/UserType";
import httpReq from "./http.service";

class AuthService {
  async login(payload: ILoginData): Promise<IUser> {
    const data: any = await httpReq.post("/login", payload);
    console.log(data);
    return data;
  }

  async register(payload: IRegisterData): Promise<IUser> {
    const data: any = await httpReq.post<IRegisterData>("/register", payload);
    return data;
  }
}

export default new AuthService();
