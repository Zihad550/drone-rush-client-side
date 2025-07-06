import { baseApi } from '@/redux/api/baseApi';
import type { IResponseRedux, TProductWriteDoc } from '@/types';
import type IProduct from '@/types/product.type';
import generateUrlParams from '@/utils/generateUrlParams';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      IResponseRedux<IProduct[]>,
      Record<string, unknown> | undefined
    >({
      query: (args) => ({
        url: '/products',
        method: 'GET',
        params: generateUrlParams(args),
      }),
      providesTags: ['products'],
    }),
    getProduct: build.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
    createProduct: build.mutation({
      query: (payload: TProductWriteDoc) => ({
        url: `/products`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['products'],
    }),
    deleteProduct: build.mutation<IResponseRedux<IProduct>, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = authApi;
