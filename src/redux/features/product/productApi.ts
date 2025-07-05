import { baseApi } from "@/redux/api/baseApi";
import type { IResponseRedux, TProductWriteDoc } from "@/types";
import type IProduct from "@/types/product.type";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      IResponseRedux<IProduct[]>,
      Record<string, unknown> | undefined
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args && Object.keys(args).length) {
          Object.entries(args).forEach(([key, value]) => {
            if (value) params.append(key, String(value));
          });
        }
        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      providesTags: ["products"],
    }),
    getProduct: build.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    createProduct: build.mutation({
      query: (payload: TProductWriteDoc) => ({
        url: `/products`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: build.mutation<IResponseRedux<IProduct>, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = authApi;
