import { baseApi } from "@/redux/api/baseApi";
import type { IResponseRedux } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    makeAdmin: build.mutation<IResponseRedux<null>, { email: string }>({
      query: (data) => {
        return {
          url: "/user/update-to-admin",
          method: "POST",
          body: data,
        };
      },
      // transformResponse: transformResponse,
    }),
  }),
});

export const { useMakeAdminMutation } = userApi;
