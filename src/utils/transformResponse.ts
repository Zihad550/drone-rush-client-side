import type { IResponseRedux } from "@/types";

export const transformResponse = (res: IResponseRedux<null>) => {
  return {
    data: res.data,
    success: res.success,
    message: res.message,
  };
};
