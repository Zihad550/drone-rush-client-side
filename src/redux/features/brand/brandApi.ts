import { baseApi } from "@/redux/api/baseApi";
import type { IResponseRedux } from "@/types";
import type IBrand from "@/types/brand.type";

const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: ({ page, limit }: { page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        return {
          url: "/brands",
          method: "GET",
          params,
        };
      },
      providesTags: ["brands"],
      transformResponse: (res: IResponseRedux<IBrand[]>) => ({
        data: res.data,
        meta: res.meta,
      }),
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
