import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (page?: number) => {
        const params = new URLSearchParams();
        if (page) params.set("page", page.toString());
        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      providesTags: ["products"],
    }),
  }),
});

export const { useGetProductsQuery } = authApi;
