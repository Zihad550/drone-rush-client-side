import { baseApi } from "@/redux/api/baseApi";
import type { IResponseRedux } from "@/types";
import type ICategory from "@/types/category.type";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: ({ page, limit }: { page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        return {
          url: "/categories",
          method: "GET",
          params,
        };
      },
      providesTags: ["categories"],
      transformResponse: (res: IResponseRedux<ICategory[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
